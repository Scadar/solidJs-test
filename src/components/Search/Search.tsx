import {
  For,
  createEffect,
  createSignal,
  on,
  mergeProps,
  Component,
  Show,
} from "solid-js";
import { BsSortDownAlt } from "solid-icons/bs";
import { BsSortDown } from "solid-icons/bs";
import { TItems } from "../../state/state_types";
import styles from "./Search.module.scss";

interface ISearch {
  items: TItems;
}

export const Search: Component<ISearch> = (props) => {
  const mergedProps = mergeProps(
    {
      items: [],
    },
    props
  );
  const [items, setItems] = createSignal<TItems>(mergedProps.items.sort());
  const [isSortDown, setIsSortDown] = createSignal<boolean>(false);
  const [text, setText] = createSignal<string>("");

  const getFilteredAndSortedItems = () => {
    let filteredItems = mergedProps?.items?.filter((el) =>
      el?.toLowerCase().includes(text().toLowerCase())
    );
    return getSortedItems(filteredItems);
  };

  const getSortedItems = (items: TItems) => {
    let sortedItems = [...items];
    sortedItems.length > 1 &&
      sortedItems.sort((a, b) => {
        if (isSortDown()) {
          return b.localeCompare(a);
        } else {
          return a.localeCompare(b);
        }
      });

    return sortedItems;
  };

  createEffect(
    on(
      () => {
        return text(), mergedProps.items;
      },
      () => setItems(getFilteredAndSortedItems())
    )
  );
  createEffect(
    on(
      () => isSortDown(),
      () => setItems(getSortedItems(items()))
    )
  );

  return (
    <div>
      <div class={styles.inputContainer}>
        <div
          class={styles.sortDownIconWrapper}
          onClick={() => setIsSortDown(!isSortDown())}
        >
          <Show
            when={isSortDown()}
            fallback={<BsSortDownAlt size={35} color="#000000" />}
          >
            <BsSortDown size={35} color="#000000" />
          </Show>
        </div>
        <input
          class={styles.textInput}
          type="text"
          onInput={(event) => {
            setText(event?.currentTarget?.value);
          }}
          value={text()}
          placeholder="...начните вводить текст"
        />
      </div>
      <div class={styles.listWrapper}>
        <For each={items()}>{(item, _index) => <div>{item}</div>}</For>
      </div>
    </div>
  );
};
