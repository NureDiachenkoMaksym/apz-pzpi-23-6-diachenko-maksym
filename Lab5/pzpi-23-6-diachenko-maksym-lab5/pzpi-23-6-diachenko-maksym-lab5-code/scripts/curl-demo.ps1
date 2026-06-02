$base = "http://localhost:3000"
$login = @{ email = "admin@nure.ua"; password = "admin123" } | ConvertTo-Json
$auth = Invoke-RestMethod -Method Post -Uri "$base/api/auth/login" -ContentType "application/json" -Body $login
$token = $auth.token
$headers = @{ Authorization = "Bearer $token" }

Invoke-RestMethod -Uri "$base/health"
Invoke-RestMethod -Uri "$base/api/regions" -Headers $headers
Invoke-RestMethod -Uri "$base/api/indicators" -Headers $headers

$newMeasurement = @{ indicator_id = 2; region_id = 1; measured_on = "2026-01-10"; value = 81.4 } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "$base/api/measurements" -Headers $headers -ContentType "application/json" -Body $newMeasurement
Invoke-RestMethod -Uri "$base/api/analytics/summary?indicatorId=2&regionId=1&dateFrom=2025-01-01&dateTo=2026-12-31" -Headers $headers
