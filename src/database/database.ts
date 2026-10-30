import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('my_accounts_manager.db');

export const initDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS accounts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          provider TEXT NOT NULL,
          provider_user_id TEXT,
          display_name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          photo_url TEXT,
          category TEXT,
          notes TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          last_used_at TEXT
        );`,
        [],
        () => {},
        (_, error) => { reject(error); return false; }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS platform_links (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          account_id INTEGER,
          platform_name TEXT NOT NULL,
          platform_url TEXT,
          local_status TEXT,
          linked_at TEXT,
          notes TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
        );`,
        [],
        () => {},
        (_, error) => { reject(error); return false; }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS app_settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL
        );`,
        [],
        () => {},
        (_, error) => { reject(error); return false; }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS audit_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          action TEXT NOT NULL,
          details TEXT,
          timestamp TEXT NOT NULL
        );`,
        [],
        () => { resolve(); },
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export default db;