import { withRouter } from "next/router";
import MachineNotificationView from "src/views/common/machine/notification.view";
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
      import(`src/views/${this.version}/machine/notification.view`).catch(
        (err) => {
          return MachineNotificationView;
        }
      )
    );
    return (
      <section id={"wrap"}>
        <View {...this.props} />
      </section>
    );
  }
}

export default withRouter(pages);
