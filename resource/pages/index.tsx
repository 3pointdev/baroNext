import { withRouter } from "next/router";
import MainView from "src/views/common/main/main.view";
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
      import(`src/views/${this.version}/main/main.view`).catch((err) => {
        return MainView;
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
