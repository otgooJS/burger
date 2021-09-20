import React, { Component } from "react";
import { connect } from "react-redux";
import css from "./style.module.css";

import axios from "../../axios-orders";
import Spinner from "../../components/General/Spinner";
import Order from "../../components/Order";
import * as actions from "../../redux/actions/orderActions";

class OrderPage extends React.Component {
  // 057_03.30
  // state = {
  //   orders: [],
  //   loading: false,
  // };

  componentDidMount() {
    this.props.loadOrders(this.props.userId);
    // this.setState({ loading: true });
    // axios
    //   .get("/orders.json")
    //   .then((response) => {
    //     // 058_06.30 function that converts an object into a massive:
    //     this.setState({ orders: Object.entries(response.data).reverse() });
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => {
    //     this.setState({ loading: false }); //054_16.30 Spinner
    //   });
  }

  render() {
    // console.log("=========" + JSON.stringify(this.props.orders));
    //   058_08.00: Hereb loading bval Spinner-iig uzuulchie
    return (
      <div>
        {this.props.loading ? (
          <Spinner />
        ) : (
          this.props.orders.map((el) => (
            //   058_03.58
            // <div key={el[0]}>{el[1].hayag.name}</div>
            <Order key={el[0]} order={el[1]} />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    userId: state.signupLoginReducer.userId, // 088_16.30 userId oruulj ugub...
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrders: (userId) => dispatch(actions.loadOrders(userId)), // 088_16.30 userId oruulj ugub...
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
