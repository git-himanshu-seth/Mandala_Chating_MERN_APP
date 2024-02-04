import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../_reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage: storage, // or any other storage engine
  whitelist: ["auth"], // List of reducers to be persisted
};
const loogerMiddleware = createLogger();
const persistReducers = persistReducer(persistConfig, rootReducer);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  persistReducers,
  composeEnhancer(applyMiddleware(thunk, loogerMiddleware))
);
export const presitStore = persistStore(store);
