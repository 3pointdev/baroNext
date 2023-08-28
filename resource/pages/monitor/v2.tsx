import { withRouter } from "next/router";
import Monitoring2View from "src/views/common/monitor/v2.view";
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
      import(`src/views/${this.version}/monitor/v2.view`).catch((err) => {
        return Monitoring2View;
      })
    );
    return (
      <section id={"wrap"}>
        <View {...this.props} />
      </section>
    );
  }
}

export async function getServerSideProps(context) {
  const headers = context.req.headers;
  return {
    props: {
      headers: headers,
    },
  };
}

export default withRouter(pages);
