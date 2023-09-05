import { configure } from "mobx";
import CompareViewModel from "src/viewModels/program/compare.viewModel";
import AuthViewModel from "../viewModels/auth/auth.viewModel";
import DefaultViewModel, {
  IDefaultProps,
} from "../viewModels/default.viewModel";
import IndicatorViewModel from "../viewModels/indicator/indicator.viewModel";
import MachineViewModel from "../viewModels/machine/machine.viewModel";
import MainViewModel from "../viewModels/main/main.viewModel";
import MonitorViewModel from "../viewModels/monitor/monitor.viewModel";
import ProgramViewModel from "../viewModels/program/program.viewModel";
import RecordViewModel from "../viewModels/record/record.viewModel";
import ReportViewModel from "../viewModels/report/report.viewModel";
import UserViewModel from "../viewModels/user/user.viewModel";

const isServer = typeof window === "undefined";

let store: any = null;
configure({ enforceActions: "observed" });

export class RootStore {
  //public 뷰모델네임 : 뷰모델타입;
  public defaultViewModel;
  public indicatorViewModel: IndicatorViewModel;
  public mainViewModel: MainViewModel;
  public machineViewModel: MachineViewModel;
  public authViewModel: AuthViewModel;
  public userViewModel: UserViewModel;
  public reportViewModel: ReportViewModel;
  public recordViewModel: RecordViewModel;
  public programViewModel: ProgramViewModel;
  public compareViewModel: CompareViewModel;
  public monitorViewModel: MonitorViewModel;

  constructor(initialData: IDefaultProps) {
    this.indicatorViewModel = new IndicatorViewModel();
    const initData = Object.assign(initialData, {
      indicatorViewModel: this.indicatorViewModel,
    });
    //this.뷰모델네임 = new 뷰모델(initData);
    this.defaultViewModel = new DefaultViewModel(initData);
    this.mainViewModel = new MainViewModel(initData);
    this.machineViewModel = new MachineViewModel(initData);
    this.authViewModel = new AuthViewModel(initData);
    this.userViewModel = new UserViewModel(initData);
    this.recordViewModel = new RecordViewModel(initData);
    this.reportViewModel = new ReportViewModel(initData);
    this.programViewModel = new ProgramViewModel(initData);
    this.compareViewModel = new CompareViewModel(initData);
    this.monitorViewModel = new MonitorViewModel(initData);
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
