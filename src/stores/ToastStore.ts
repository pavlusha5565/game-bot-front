import { makeAutoObservable } from "mobx";
import { status } from "../utils/constants";

export interface IToastPayload {
  time?: Date;
  title: string;
  content: string | JSX.Element;
}

export class ToastStore {
  toast: IToastPayload[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addToast(payload: IToastPayload, config: { delay: number; status: status }) {
    this.toast.push(payload);
  }

  notify(payload: IToastPayload) {}
  warn(payload: IToastPayload) {}
  error(payload: IToastPayload) {}
}
