import PageContainer from "components/container/pageContainer";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";

interface IProps {}

function ScheduleView(props: IProps) {
  useEffect(() => {}, []);

  return (
    <PageContainer>
      <></>
    </PageContainer>
  );
}

export default inject()(observer(ScheduleView));
