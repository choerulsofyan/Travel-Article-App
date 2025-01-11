import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./store/store";
import "./styles/main.scss";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Import Bootstrap JS with Popper
import { loadUserFromLocalStorage } from "./store/modules/auth/authSlice";

store.dispatch(loadUserFromLocalStorage());

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);
