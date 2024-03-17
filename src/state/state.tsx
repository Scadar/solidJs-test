import { createStore, unwrap } from "solid-js/store";
import { TItems, TItem, TSignals, TStore } from "./state_types";

export class State {
  signals: TSignals;

  constructor(items: TItems) {
    if (!is_items_correct(items))
      throw new Error("items for State are incorrect.");

    const [store, set_store] = createStore<TStore>({ list: items });

    this.signals = {
      store,
      set_store,
    };
  }

  get_items() {
    return unwrap(this.signals.store.list);
  }

  get_item(index: number) {
    return this.signals.store.list[index];
  }

  add_item(item: TItem) {
    this.signals.set_store("list", (items) => [...items, item]);
  }

  set_items(items: TItems) {
    this.signals.set_store("list", items);
  }

  remove_item(item: number | TItem) {
    if (typeof item === "number") {
      this.signals.set_store("list", (items) =>
        items.filter((_, ind) => ind !== item)
      );
    }

    if (typeof item === "string") {
      this.signals.set_store("list", (items) =>
        items.filter((str) => !str.toLowerCase().includes(item.toLowerCase()))
      );
    }
  }

  update_item(index: number, updated_item: TItem) {
    this.signals.set_store("list", (_, ind) => ind === index, updated_item);
  }
}

function is_items_correct(items: TItems): boolean {
  if (!Array.isArray(items) || items.length === 0) return false;

  for (let item of items) {
    if (typeof item !== "string") return false;
  }

  return true;
}
