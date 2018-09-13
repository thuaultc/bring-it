import StorageAPI from "./StorageAPI";
import { v4 } from "uuid";

export default class LocalStorageAPI extends StorageAPI {
  createEvent(payload) {
    const id = v4();

    localStorage.setItem(id, JSON.stringify({ id, payload }));

    return id;
  }

  updateEvent(payload, id) {
    const current = window.localStorage.getItem(id);

    if (!current) {
      throw new Error(
        `[LocalStorageAPI] updateEvent(payload, ${id}) -- Event not found in storage.`
      );
    }

    localStorage.setItem(id, JSON.stringify({ id, payload }));
  }

  getEvent(id) {
    const current = window.localStorage.getItem(id);

    if (!current) {
      throw new Error(
        `[LocalStorageAPI] updateEvent(payload, ${id}) -- Event not found in storage.`
      );
    }

    return current;
  }
}
