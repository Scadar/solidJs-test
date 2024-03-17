import type { Component } from "solid-js";
import styles from "./App.module.scss";
import { Page } from "./pages/Page";

const App: Component = () => {
  return (
    <div class={styles.container}>
      <Page />
    </div>
  );
};

export default App;
