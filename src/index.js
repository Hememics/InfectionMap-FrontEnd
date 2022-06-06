import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistorStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import userReducer, { initalState } from './store/reducers/user';
import persistStore from 'redux-persist/es/persistStore';


const persistConfig = {
  key: "root",
  storage
}

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({ reducer: persistedReducer, preloadedState: initalState, middleware: []});

console.log(store);

persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
