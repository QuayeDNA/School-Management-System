import db from '../db/db';

export const syncService = {
  flush: async () => {
    if (!navigator.onLine) return;
    const queue = await db.syncQueue.orderBy('createdAt').toArray();

    for (const item of queue) {
      try {
        // TODO: implement backend API sync
        // await apiClient.sync(item);

        await db.syncQueue.delete(item.id);
        if (item.table && item.data?.id) {
          await db[item.table]?.update(item.data.id, { syncStatus: 'synced' });
        }
      } catch (error) {
        await db.syncQueue.update(item.id, { attempts: (item.attempts || 0) + 1 });
      }
    }
  },
};
