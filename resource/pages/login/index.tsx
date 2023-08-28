import { withRouter } from "next/router";
import LoginView from "src/views/common/login/login.view";
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
      import(`src/views/${this.version}/login/login.view`).catch((err) => {
        return LoginView;
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
