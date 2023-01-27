import { action, computed, makeObservable, observable } from "mobx";

export type IStateUpdaterFunc<State extends object> = (
  state: State
) => Partial<State>;

export type IStateUpdater<State extends object> =
  | Partial<State>
  | IStateUpdaterFunc<State>;

export class BehaviorStore<State extends object> {
  _state: State;

  constructor(initialState: State) {
    this._state = initialState;
    makeObservable(this, {
      _state: observable,
      setState: action,
      updateState: action,
      state: computed,
    });
  }

  setState(state: State) {
    this._state = state;
  }

  updateState(stateUpdate: IStateUpdater<State>) {
    const state: State = this._state;
    if (typeof stateUpdate === "function") {
      this._state = {
        ...state,
        ...stateUpdate(this.state),
      };
    } else {
      this._state = {
        ...state,
        ...stateUpdate,
      };
    }
  }

  get state() {
    return this._state;
  }
}
