import AuthViewModel from "../viewModels/auth/auth.viewModel";
import DefaultViewModel, {
  IDefaultProps,
} from "../viewModels/default.viewModel";
import MainViewModel from "../viewModels/main/main.viewModel";
import { configure } from "mobx";
import UserViewModel from "../viewModels/user/user.viewModel";

const isServer = typeof window === "undefined";

let store: any = null;
configure({ enforceActions: "observed" });

export class RootStore {
  //public 뷰모델네임 : 뷰모델타입;
  public mainViewModel: MainViewModel;
  public authViewModel: AuthViewModel;
  public userViewModel: UserViewModel;

  constructor(initialData: IDefaultProps) {
    const initData = Object.assign(initialData, {});
    //this.뷰모델네임 = new 뷰모델(initData);
    this.mainViewModel = new MainViewModel(initData);
    this.authViewModel = new AuthViewModel(initData);
    this.userViewModel = new UserViewModel(initData);
  }
}

export default function initializeStore(initData: IDefaultProps) {
  if (isServer) {
    return new RootStore(initData);
  }
  if (store === null) {
    store = new RootStore(initData);
  }

  return store;
}
