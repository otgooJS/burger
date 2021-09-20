import React from "react";
import { connect } from "react-redux";

import { Route } from "react-router-dom";
import Burger from "../../components/Burger";
import ContactData from "../../components/ContactData";
import Button from "../../components/General/Button";
import css from "./style.module.css";

class ShippingPage extends React.Component {
  cancelOrder = () => {
    this.props.history.goBack();
    // 063_02.00
    // this.props.history.push("/");
  };
  showContactData = () => {
    // this.props.history.push("/ship/contact");
    this.props.history.replace("/ship/contact"); //063_03.00
  };

  render() {
    return (
      <div className={css.ShippingPage}>
        <p style={{ fontSize: "22px" }}>
          <strong>Таны захиалга амттай байх болно гэж найдаж байна.</strong>
        </p>
        <p style={{ fontSize: "22px" }}>
          <strong>Дүн: {this.props.price}₮</strong>
        </p>
        <Burger />
        <Button
          daragdsan={this.cancelOrder}
          btnType="Danger"
          text="ЗАХИАЛГЫГ ЦУЦЛАХ"
        />
        <Button
          daragdsan={this.showContactData}
          btnType="Success"
          text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
        />
        {/* 063_16.00 State dotorh medeellig ContactData-ryy 2 yanzaar damjuulj bolno */}
        {/* <Route path="/ship/contact" render={()=>(<ContactData ingredients={this.state.ingredients} price={this.state.price}/>)} /> */}
        <Route path="/ship/contact">
          <ContactData />
        </Route>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
  };
};

export default connect(mapStateToProps)(ShippingPage);
