import loadable from "@loadable/component";
import { withRouter } from "next/router";
import React from "react";

class pages extends React.Component<any, any> {
  private readonly version: string;
  constructor(props: any) {
    super(props);
    this.version = props.version;
  }

  render() {
    const MainContainer = loadable(
      () => import(`src/views/${this.version}/monitor/v2.view`),
      {
        fallback: <></>,
      }
    );

    return (
      <section id={"wrap"}>
        <MainContainer {...this.props} />
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
