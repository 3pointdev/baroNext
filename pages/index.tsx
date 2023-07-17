import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import MainViewModel from "../src/viewModels/main/main.viewModel";

function MainView(props: any) {
  const mainViewModel: MainViewModel = props.mainViewModel;

  useEffect(() => {
    mainViewModel.getMachineList();
    mainViewModel.getProcessedQuantity();
  }, []);

  return <div>123</div>;
}

export default inject("mainViewModel")(observer(MainView));
