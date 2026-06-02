import { resources, users } from './mock-data.js';

const delay = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 120));

export const ApiClient = {
  async getResources(filterType = 'all') {
    const data = filterType === 'all' ? resources : resources.filter((item) => item.type === filterType);
    return delay(data);
  },
  async getUsers() { return delay(users); },
  async createBackup() {
    return delay({ fileName: `backup-${new Date().toISOString().slice(0, 10)}.json`, status: 'created' });
  },
  async exportAnalytics(format = 'json') {
    return delay({ format, records: resources.length, status: 'exported' });
  },
  async importData(fileName) {
    return delay({ fileName, imported: 128, rejected: 3, status: 'processed' });
  }
};
