import { action, makeObservable, observable } from "mobx";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { applyObject } from "../utils/objects";
import { REACT_API } from "../utils/constants";

export class ApiClient {
  config: AxiosRequestConfig<any> = {
    baseURL: REACT_API,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // non observable.
  instance: AxiosInstance;

  constructor() {
    makeObservable(this, {
      config: observable,
      updateConfig: action,
    });
    this.instance = axios.create(this.config);
  }

  updateConfig(config: AxiosRequestConfig<any>) {
    applyObject(this.config, config);
    this.instance = axios.create(this.config);
  }
}
