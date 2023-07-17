import AuthViewModel from "../viewModels/auth/auth.viewModel";
import DefaultViewModel from "../viewModels/default.viewModel";
import MainViewModel from "../viewModels/main/main.viewModel";
import { configure } from "mobx";

let store: any = null;
configure({ enforceActions: "observed" });

export interface MobxInitProps {}

export class RootStore {
  //public 뷰모델네임 : 뷰모델타입;
  public defaultViewModel: DefaultViewModel;
  public mainViewModel: MainViewModel;
  public authViewModel: AuthViewModel;

  constructor(initialData: MobxInitProps) {
    const initData = Object.assign(initialData, {});
    //this.뷰모델네임 = new 뷰모델(initData);
    this.defaultViewModel = new DefaultViewModel(initData);
    this.mainViewModel = new MainViewModel(initData);
    this.authViewModel = new AuthViewModel(initData);
  }
}

export default function initializeStore(initData: MobxInitProps) {
  store = new RootStore(initData);

  return store;
}
