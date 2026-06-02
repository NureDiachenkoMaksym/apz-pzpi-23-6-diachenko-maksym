const API_URL = '/api';

export async function getResourceRecords(params) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/resources?${query}`);
  return response.json();
}

export async function exportReport(format) {
  const response = await fetch(`${API_URL}/reports/export?format=${format}`);
  return response.blob();
}
