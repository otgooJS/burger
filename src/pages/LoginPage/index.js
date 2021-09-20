import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../../components/General/Button";
import css from "./style.module.css";
import * as actions from "../../redux/actions/loginActions";
import Spinner from "../../components/General/Spinner";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  login = () => {
    // alert("Login... " + this.state.password);
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    return (
      <div className={css.Login}>
        {this.props.userId && <Redirect to="/orders" />}
        <input
          onChange={this.changeEmail}
          type="text"
          placeholder="Имэйл хаяг"
        />
        <input
          onChange={this.changePassword}
          type="password"
          placeholder="Нууц үг"
        />
        {/* 086_13.50 */}
        {this.props.logginIn && <Spinner />}
        {this.props.firebaseError && (
          <div style={{ color: "red" }}>
            {this.props.firebaseError} код нь: {this.props.firebaseErrorCode}
          </div>
        )}
        <Button text="ЛОГИН" btnType="Success" daragdsan={this.login} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logginIn: state.signupLoginReducer.logginIn,
    firebaseError: state.signupLoginReducer.firebaseError,
    firebaseErrorCode: state.signupLoginReducer.firebaseErrorCode,
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(actions.loginUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
