import axios from "../../axios-orders";
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Button from "../General/Button";
import Spinner from "../General/Spinner";
import css from "./style.module.css";
import * as actions from "../../redux/actions/orderActions";

class ContactData extends React.Component {
  state = {
    hayag: {
      name: null,
      city: null,
      street: null,
      // loading: false,
    },
  };

  changeName = (e) => {
    this.setState({ name: e.target.value });
  };
  changeStreet = (e) => {
    this.setState({ street: e.target.value });
  };
  changeCity = (e) => {
    this.setState({ city: e.target.value });
  };

  //081_17.15:
  componentDidUpdate() {
    if (
      this.props.newOrderStatus.finished &&
      !this.props.newOrderStatus.error
    ) {
      this.props.history.replace("/orders");
    }
  }

  saveOrder = () => {
    const newOrder = {
      userId: this.props.userId,
      orts: this.props.ingredients,
      dun: this.props.price,
      hayag: {
        name: this.state.name,
        city: this.state.city,
        street: this.state.street,
      },
    };
    this.props.saveOrderAction(newOrder);
  };
  render() {
    // console.log(this.props)
    return (
      <div className={css.ContactData}>
        {/* name: {this.state.name} */}
        <p style={{ fontSize: "18px" }}>
          <strong>Үнэ: {this.props.price}₮</strong>
        </p>
        {/* 081_15.05 */}
        <div>
          {this.props.newOrderStatus.error &&
            `Захиалгыг хадгалалах явцад алдаа гарлаа : ${this.props.newOrderStatus.error}`}
        </div>
        {/* {this.state.loading ? ( */}
        {/* 081_12.50: */}
        {this.props.newOrderStatus.saving ? (
          <Spinner />
        ) : (
          <div>
            <input
              onChange={this.changeName}
              type="text"
              name="name"
              placeholder="Таны нэр"
            />
            <input
              onChange={this.changeStreet}
              type="text"
              name="street"
              placeholder="Гэрийн хаяг"
            />
            <input
              onChange={this.changeCity}
              type="text"
              name="city"
              placeholder="Хот"
            />
            <Button
              text="ИЛГЭЭХ"
              btnType="Success"
              daragdsan={this.saveOrder}
            />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
    ingredients: state.burgerReducer.ingredients,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.signupLoginReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderAction: (newOrder) => dispatch(actions.saveOrder(newOrder)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
