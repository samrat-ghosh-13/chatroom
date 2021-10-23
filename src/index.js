import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

// components
import LoaderComponent from "./components/loader/Loader";

// components on demand
const HeaderComponent = React.lazy(() => import("./components/header/Header"));
const FooterComponent = React.lazy(() => import("./components/footer/Footer"));
const ContentComponent = React.lazy(() =>
  import("./components/content/Content")
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <main className="app">
        <Suspense fallback={<LoaderComponent />}>
          <HeaderComponent />
          <ContentComponent />
          <FooterComponent />
        </Suspense>
      </main>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
