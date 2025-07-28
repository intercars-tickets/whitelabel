import { combineReducers, configureStore, } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "./authSlice";
//import {createStateSyncMiddleware} from "redux-state-sync";


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // if you do not want to persist this part of the state
    // blacklist: ['omitedPart']
}

const reducer = combineReducers({
    auth: authReducer,
})
const persistedReducer = persistReducer(persistConfig, reducer)


// const syncStateMiddleware = [
//     createStateSyncMiddleware({
//         blacklist: ['persist/PERSIST', 'persist/REHYDRATE'],
//     })
// ];


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         immutableCheck: false,
    //         serializableCheck: false,
    //     }).concat(syncStateMiddleware as any),
});

//export default store;

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     companyInfo: companyInfoReducer,
//   },
//   preloadedState: {},
// });

export type IRootStore = typeof store;
export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

