import AuthViewModel from "../viewModels/auth/auth.viewModel";
import DefaultViewModel, {
  IDefaultProps,
} from "../viewModels/default.viewModel";
import MainViewModel from "../viewModels/main/main.viewModel";
import { configure } from "mobx";
import UserViewModel from "../viewModels/user/user.viewModel";
import MachineViewModel from "../viewModels/machine/machine.viewModel";
import ReportViewModel from "../viewModels/report/report.viewModel";
import RecordViewModel from "../viewModels/record/record.viewModel";
import IndicatorViewModel from "../viewModels/indicator/indicator.viewModel";
import ProgramViewModel from "../viewModels/program/program.viewModel";

const isServer = typeof window === "undefined";

let store: any = null;
configure({ enforceActions: "observed" });

export class RootStore {
  //public 뷰모델네임 : 뷰모델타입;
  public indicatorViewModel: IndicatorViewModel;
  public mainViewModel: MainViewModel;
  public machineViewModel: MachineViewModel;
  public authViewModel: AuthViewModel;
  public userViewModel: UserViewModel;
  public reportViewModel: ReportViewModel;
  public recordViewModel: RecordViewModel;
  public programViewModel: ProgramViewModel;

  constructor(initialData: IDefaultProps) {
    this.indicatorViewModel = new IndicatorViewModel();
    const initData = Object.assign(initialData, {
      indicatorViewModel: this.indicatorViewModel,
    });
    //this.뷰모델네임 = new 뷰모델(initData);
    this.mainViewModel = new MainViewModel(initData);
    this.machineViewModel = new MachineViewModel(initData);
    this.authViewModel = new AuthViewModel(initData);
    this.userViewModel = new UserViewModel(initData);
    this.recordViewModel = new RecordViewModel(initData);
    this.reportViewModel = new ReportViewModel(initData);
    this.programViewModel = new ProgramViewModel(initData);
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
