import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import LoaderComponent from "./components/loader/Loader";

// components on demand
const HeaderComponent = lazy(() => import("./components/header/Header"));
const FooterComponent = lazy(() => import("./components/footer/Footer"));
const ContentComponent = lazy(() => import("./components/content/Content"));
const SigninComponent = lazy(() => import("./components/signin/Signin"));
const RegisterComponent = lazy(() => import("./components/register/Register"));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <main className="app">
          <Switch>
            <Route exact path="/">
              <Suspense fallback={<LoaderComponent />}>
                <HeaderComponent />
                <ContentComponent />
                <FooterComponent />
              </Suspense>
            </Route>
            <Route path="/signin">
              <Suspense fallback={<LoaderComponent />}>
                <HeaderComponent />
                <SigninComponent />
                <FooterComponent />
              </Suspense>
            </Route>
            <Route path="/register">
              <Suspense fallback={<LoaderComponent />}>
                <HeaderComponent />
                <RegisterComponent />
                <FooterComponent />
              </Suspense>
            </Route>
          </Switch>
        </main>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
