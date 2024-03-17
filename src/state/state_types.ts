import { SetStoreFunction } from "solid-js/store";

export type TStore = {
  list: TItems;
};

// export type TStoreItems = {
//   [index: number]: string;
// };

export type TItems = TItem[];

export type TItem = string;

export type TSignals = {
  store: TStore;
  set_store: SetStoreFunction<TStore>;
};
