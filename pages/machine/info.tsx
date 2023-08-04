import { inject, observer } from "mobx-react";

function MachineInfoView(props) {
  return <></>;
}

export default inject("machineViewModel")(observer(MachineInfoView));
