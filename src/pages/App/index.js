import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import css from "./style.module.css";

import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage"; //040_02.38 OrderButton deer BurgerBuilder changed to BurgerPage
import SideBar from "../../components/SideBar";
import OrderPage from "../OrderPage";
import { Route, Switch } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import Logout from "../../components/Logout";
import * as actions from "../../redux/actions/loginActions";
import * as signupActions from "../../redux/actions/signupActions";

// function App() {
// 0.49_06.00 Let's change the function App component to class App
class App extends Component {
  state = {
    showSidebar: false,
  };

  toggleSideBar = () => {
    this.setState((prevState) => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  //090_10.00 Logout hiilgui garaad, dahin orohod shuud automat login hiih..Yah hiih uu? locinActions.js dotroos loginUserSuccess f-iig duudah
  componentDidMount = () => {
    const token = localStorage.getItem(`token`);
    const userId = localStorage.getItem(`userId`);
    const expireDate = new Date(localStorage.getItem(`expireDate`)); //092_12.20 II-r task
    const refreshToken = localStorage.getItem(`refreshTok`);
    if (token) {
      //92_14.10: Token Hugatsaagui boloogui bval welcome buyu auto login hiine:)
      if (expireDate > new Date()) {
        this.props.autoLogin(token, userId);
        this.props.autoLogoutAfterMillisec(
          expireDate.getTime() - new Date().getTime() //092_18.05 Token huchingui boloh hurtelh yldej bgaa hugatsaag tootsoolj ter hugatsaa bolhod automat-aar logout hiine
        );
      } else {
        //092_14.20: Jinheneesee sorry/logout hiine. logout hiih yostoi Gevch bidend tiim f no bn aa
        this.props.logout();
      }
    }
  };

  render() {
    return (
      <div>
        <Toolbar toggleSideBar={this.toggleSideBar} />
        <SideBar
          showSidebar={this.state.showSidebar}
          toggleSideBar={this.toggleSideBar}
        />
        <main className={css.Content}>
          {/* <p>User Id: {this.props.userId}</p> */}

          {this.props.userId ? (
            <Switch>
              {/* Ene hamgiin ehend bhgui bol ajillahgui bn */}
              <Route path="/logout" component={Logout} />
              <Route path="/orders" component={OrderPage} />
              <Route path="/ship" component={ShippingPage} />
              <Route path="/" component={BurgerPage} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/signup" component={SignupPage} />
              <Route path="/login" component={LoginPage} />
              <Redirect to="/Login" />
            </Switch>
          )}

          {/* <BurgerPage /> */}
          {/* <OrderPage /> */}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.signupLoginReducer.userId,
  };
};
//090_12.10
const mapDisptachToState = (dispatch) => {
  return {
    autoLogin: (token, userId) =>
      dispatch(actions.loginUserSuccess(token, userId)),
    logout: () => dispatch(signupActions.logout),
    autoLogoutAfterMillisec: () => dispatch(signupActions.logout),
  };
};

export default connect(mapStateToProps, mapDisptachToState)(App);
