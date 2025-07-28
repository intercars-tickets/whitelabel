import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {store} from "./redux/store";
import {Provider} from "react-redux";


const persistor = persistStore(store);
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            {/*<React.StrictMode>*/}
                <PersistGate persistor={persistor}>
                    <App/>
                </PersistGate>
            {/*</React.StrictMode>*/}
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
