import { withRouter } from "next/router";
import Monitoring3View from "src/views/common/monitor/v3.view";
import React from "react";
import dynamic from "next/dynamic";

class pages extends React.Component<any, any> {
  private readonly version: string;
  constructor(props: any) {
    super(props);
    this.version = props.version;
  }

  render() {
    const View = dynamic(() =>
      import(`src/views/${this.version}/monitor/v3.view`).catch((err) => {
        return Monitoring3View;
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
