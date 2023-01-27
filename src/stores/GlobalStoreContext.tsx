import React from "react";
import { ApiClient } from "./ApiClient";
import { ToastStore } from "./ToastStore";

export interface IStoreContext {
  ApiClient: ApiClient;
  ToastStore: ToastStore;
}

const stores: IStoreContext = {
  ApiClient: new ApiClient(),
  ToastStore: new ToastStore(),
};

export const StoreContext = React.createContext<IStoreContext>(stores);

export function StoreProvider({ children }: { children: React.ReactElement }) {
  return (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  );
}

export function useGlobalStore(): IStoreContext {
  return React.useContext<IStoreContext>(StoreContext);
}

export function useStore(
  store: keyof IStoreContext
): IStoreContext[keyof IStoreContext] {
  const context = React.useContext<IStoreContext>(StoreContext);
  return context[store];
}
