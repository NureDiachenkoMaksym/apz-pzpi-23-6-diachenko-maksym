import argparse
import json
import math
import random
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import requests

CONFIG_PATH = Path("config.json")


def load_config(path: Path = CONFIG_PATH) -> Dict[str, Any]:
    if not path.exists():
        raise FileNotFoundError("config.json not found. Copy config.example.json or run --wizard.")
    return json.loads(path.read_text(encoding="utf-8"))


def iso_date_utc() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


class SimulatedSensor:
    def __init__(self, min_value: float, max_value: float, noise: float):
        self.min_value = min_value
        self.max_value = max_value
        self.noise = noise
        self._base = (min_value + max_value) / 2.0
        self._t = 0.0

    def read(self) -> float:
        self._t += 0.3
        wave = math.sin(self._t) * (self.max_value - self.min_value) * 0.1
        jitter = random.uniform(-self.noise, self.noise)
        value = self._base + wave + jitter
        return float(max(self.min_value, min(self.max_value, value)))


class DataProcessor:
    def __init__(self, method: str, ewma_alpha: float, ma_window: int, z_threshold: float):
        self.method = method.lower()
        self.ewma_alpha = ewma_alpha
        self.ma_window = ma_window
        self.z_threshold = z_threshold
        self._ewma: Optional[float] = None
        self._history: List[float] = []

    def _moving_average(self) -> float:
        window = self._history[-self.ma_window:]
        return sum(window) / max(1, len(window))

    def _ewma_update(self, x: float) -> float:
        if self._ewma is None:
            self._ewma = x
        else:
            self._ewma = self.ewma_alpha * x + (1 - self.ewma_alpha) * self._ewma
        return self._ewma

    def _mean_stdev(self, values: List[float]) -> Tuple[float, float]:
        n = len(values)
        if n < 2:
            return values[0] if n == 1 else 0.0, 0.0
        mean = sum(values) / n
        variance = sum((v - mean) ** 2 for v in values) / (n - 1)
        return mean, math.sqrt(variance)

    def process(self, raw_value: float) -> Dict[str, Any]:
        self._history.append(raw_value)
        smoothed = self._moving_average() if self.method == "ma" else self._ewma_update(raw_value)
        recent = self._history[-max(10, self.ma_window):]
        mean, stdev = self._mean_stdev(recent)
        z = (raw_value - mean) / stdev if stdev > 1e-9 else 0.0
        return {
            "raw": raw_value,
            "smoothed": float(smoothed),
            "mean": float(mean),
            "stdev": float(stdev),
            "z": float(z),
            "is_anomaly": abs(z) >= self.z_threshold,
        }


def login(base_url: str, email: str, password: str) -> str:
    response = requests.post(f"{base_url}/api/auth/login", json={"email": email, "password": password}, timeout=10)
    response.raise_for_status()
    data = response.json()
    return data["token"]


def post_measurement(base_url: str, token: str, indicator_id: int, region_id: int, value: float) -> Dict[str, Any]:
    headers = {"Authorization": f"Bearer {token}"}
    payload = {
        "indicator_id": indicator_id,
        "region_id": region_id,
        "measured_on": iso_date_utc(),
        "value": round(value, 2),
    }
    response = requests.post(f"{base_url}/api/measurements", json=payload, headers=headers, timeout=10)
    response.raise_for_status()
    return response.json()


def wizard() -> None:
    base_url = input("API URL [http://localhost:3000]: ").strip() or "http://localhost:3000"
    email = input("Email [operator@nure.ua]: ").strip() or "operator@nure.ua"
    password = input("Password [operator123]: ").strip() or "operator123"
    region_id = int(input("Region ID [1]: ").strip() or "1")
    indicator_id = int(input("Indicator ID [2]: ").strip() or "2")
    cfg = {
        "server_base_url": base_url,
        "login": {"email": email, "password": password},
        "device": {"device_id": "NR-SENSOR-001", "region_id": region_id, "indicator_id": indicator_id, "interval_sec": 5},
        "sensor": {"min_value": 65, "max_value": 95, "noise": 4.0},
        "processing": {"method": "ewma", "ewma_alpha": 0.35, "ma_window": 5, "z_threshold": 2.0},
    }
    CONFIG_PATH.write_text(json.dumps(cfg, ensure_ascii=False, indent=2), encoding="utf-8")
    print("config.json saved")


def run_once(cfg: Dict[str, Any]) -> None:
    base_url = cfg["server_base_url"].rstrip("/")
    token = login(base_url, cfg["login"]["email"], cfg["login"]["password"])
    sensor = SimulatedSensor(**cfg["sensor"])
    processor = DataProcessor(**cfg["processing"])
    info = processor.process(sensor.read())
    result = post_measurement(base_url, token, int(cfg["device"]["indicator_id"]), int(cfg["device"]["region_id"]), info["smoothed"])
    print(json.dumps({"measurement": result, "processing": info}, ensure_ascii=False, indent=2))


def run_loop(cfg: Dict[str, Any]) -> None:
    base_url = cfg["server_base_url"].rstrip("/")
    interval = int(cfg["device"]["interval_sec"])
    token = login(base_url, cfg["login"]["email"], cfg["login"]["password"])
    sensor = SimulatedSensor(**cfg["sensor"])
    processor = DataProcessor(**cfg["processing"])
    print("=== EcoResource IoT client started ===")
    while True:
        info = processor.process(sensor.read())
        try:
            result = post_measurement(base_url, token, int(cfg["device"]["indicator_id"]), int(cfg["device"]["region_id"]), info["smoothed"])
            print(f"[sent] raw={info['raw']:.2f} smoothed={info['smoothed']:.2f} z={info['z']:.2f} id={result.get('id')}")
        except Exception as exc:
            print(f"[error] {exc} -> retry in {interval}s")
        time.sleep(interval)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--wizard", action="store_true")
    parser.add_argument("--once", action="store_true")
    parser.add_argument("--run", action="store_true")
    args = parser.parse_args()

    if args.wizard:
        wizard()
        return
    cfg = load_config()
    if args.once:
        run_once(cfg)
    else:
        run_loop(cfg)


if __name__ == "__main__":
    main()
