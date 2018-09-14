import StorageAPI from "./StorageAPI";
import { v4 } from "uuid";

export default class LocalStorageAPI extends StorageAPI {
  createEvent(payload) {
    const id = v4();

    localStorage.setItem(id, JSON.stringify({ id, payload }));

    console.log(`[Storage] Create ${id}`);
    return id;
  }

  updateEvent(payload, id) {
    const current = window.localStorage.getItem(id);

    if (!current) {
      throw new Error(
        `[LocalStorageAPI] updateEvent(payload, ${id}) -- Event not found in storage.`
      );
    }

    const prevEvent = JSON.parse(current);
    const nextEvent = {
      ...prevEvent,
      id,
      payload: { ...prevEvent.payload, ...payload }
    };

    localStorage.setItem(id, JSON.stringify(nextEvent));

    console.log(`[Storage] Update ${id} ${JSON.stringify(nextEvent, null, 2)}`);
  }

  getEvent(id) {
    const current = window.localStorage.getItem(id);

    if (!current) {
      throw new Error(
        `[LocalStorageAPI] updateEvent(payload, ${id}) -- Event not found in storage.`
      );
    }

    console.log(`[Storage] Get ${id}`);

    return current;
  }
}
