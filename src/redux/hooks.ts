import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, IRootState } from "./store";

// Используйте во всем приложении вместо обычных `useDispatch` и `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

//need to read about new approach https://redux.js.org/usage/usage-with-typescript
// Use throughout your app instead of plain `useDispatch` and `useSelector`
//export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
//export const useAppSelector = useSelector.withTypes<IRootState>()
//export const useAppStore = useStore.withTypes<AppStore>()