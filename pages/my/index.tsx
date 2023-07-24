import { inject, observer } from "mobx-react";
import UserViewModel from "../../src/viewModels/user/user.viewModel";
import { useEffect } from "react";
import PageContainer from "../../components/container/pageContainer";

interface IProps {
  userViewModel: UserViewModel;
}

function MyPageView(props: IProps) {
  const userViewModel = props.userViewModel;

  useEffect(() => {
    userViewModel.getMe();
  }, []);

  console.log(userViewModel.user);
  return (
    <PageContainer>
      <></>
    </PageContainer>
  );
}

export default inject("userViewModel")(observer(MyPageView));
