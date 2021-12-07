import Dexie from 'dexie';

export const db = new Dexie('database');
db.version(1).stores({
  users: '++id, icon, header, name, screen_name, lang, is_artist, comms_open, suggested_price, complete_rate, allow_hidden, allow_nsfw, total_works',
});