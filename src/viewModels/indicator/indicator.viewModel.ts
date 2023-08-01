import { action, makeObservable, observable, runInAction } from "mobx";
import { NextRouter } from "next/router";

export default class IndicatorViewModel {
  public indicator: boolean = false;
  constructor() {
    makeObservable(this, {
      indicator: observable,
      useIndicator: action,
    });
  }

  public useIndicator = (state: boolean) => {
    runInAction(() => {
      this.indicator = state;
    });
  };
}
