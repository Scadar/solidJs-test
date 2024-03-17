import { unwrap } from "solid-js/store";
import { Search } from "../components/Search/Search";
import { items } from "../data";
import { State } from "../state/state";
import styles from "./Page.module.scss";

const state = new State(items);
window.s_state = state;

export const Page = () => {
  return (
    <section class={styles.container}>
      <div class={styles.page_container}>
        {/* Компонент Search принимает массив городов ["Москва", "Санкт-Петербург", .....] */}
        <Search items={state.get_items()} />
      </div>
    </section>
  );
};
