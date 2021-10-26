// react and react dom
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

// redux store and provider
import { store } from "./store/store";
import { Provider } from "react-redux";

// default service worker with CRA
import * as serviceWorker from "./serviceWorker";

// react router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import LoaderComponent from "./components/loader/Loader";
import { ToastContainer } from "react-toastify";

// styles
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// components on demand
const HeaderComponent = lazy(() => import("./components/header/Header"));
const FooterComponent = lazy(() => import("./components/footer/Footer"));
const ContentComponent = lazy(() => import("./components/content/Content"));
const SigninComponent = lazy(() => import("./components/signin/Signin"));
const RegisterComponent = lazy(() => import("./components/register/Register"));

const App = () => {
  return (
    <Router>
      <main className="app">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover
        />
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
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// expose store when run in Cypress
if (window.Cypress) {
  window.store = store;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
