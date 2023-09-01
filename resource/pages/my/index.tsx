import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import React from "react";
import MypageView from "src/views/common/my/mypage.view";

class pages extends React.Component<any, any> {
  private readonly version: string;
  constructor(props: any) {
    super(props);
    this.version = props.version;
  }

  render() {
    const View = dynamic(() =>
      import(`src/views/${this.version}/my/mypage.view`).catch((err) => {
        return MypageView;
      })
    );

    return (
      <section id={"wrap"}>
        <View {...this.props} />
      </section>
    );
  }
}

export default withRouter(pages);
