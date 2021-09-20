import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../redux/actions/signupActions";

class Logout extends React.Component {
  //   087_19.55
  componentDidMount = () => {
    this.props.logout();
  };
  render() {
    return <Redirect to="/" />;
  }
}

const mapDisptachToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDisptachToProps)(Logout);
