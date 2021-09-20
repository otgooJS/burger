import React, { Component } from "react";
// import { connect } from "react-redux";
import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import Modal from "../../components/General/Modal";
import OrderSummary from "../../components/OrderSummary";
// import axios from "axios";
import axios from "../../axios-orders";
import Spinner from "../../components/General/Spinner";
import * as actions from "../../redux/actions/burgerActions"; //072_11.52

// const INGREDIENT_PRICES = { salad: 150, cheese: 250, bacon: 800, meat: 1500 }; // 039_02.12
// const INGREDIENT_NAMES = {
//   bacon: "Гахайн мах",
//   cheese: "Бяслаг",
//   salad: "Салад",
//   meat: "Үхрийн мах",
// };

class BurgerPage extends Component {
  // 036_06.10: class dotor state bichih
  state = {
    // ingredients: {
    //   salad: 0,
    //   cheese: 0,
    //   bacon: 0,
    //   meat: 0,
    // },
    // totalPrice: 0,
    // purchasing: false,
    confirmOrder: false,
  };
  //053_05.30 Read from firebase: BurgerPage: index.js
  // componentDidMount = () => {}; //073_08.00 deer: componentDidMount won't be used anymore so deleted.

  //045_12.30
  continueOrder = () => {
    // console.log("continue pressed...");
    // const order = {
    //   orts: this.props.burgeriinOrts,
    //   dun: this.props.niitUne,
    //   hayag: {
    //     name: `Orgil2`,
    //     city: `UB`,
    //     street: `10r horoolol 23-12`,
    //   },
    // };
    // this.setState({ loading: true });
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     // .post(
    //     //   `https://burger-9b5fd-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json`,
    //     //  order
    //     // )
    //     alert(`Susseccfully saved`);
    //   })
    //   .finally(() => {
    //     this.setState({ loading: false });
    //   });

    //060_12.40 ShippingPage ruu usreh
    //this.props.history.push("/ship");
    // const params = [];
    // for (let orts in this.props.burgeriinOrts) {
    //   // console.log(orts + "=" + this.props.burgeriinOrts[orts]);
    //   params.push(orts + "=" + this.props.burgeriinOrts[orts]);
    // }

    // params.push("dun=" + this.props.niitUne);
    // const query = params.join("&"); //075_01.30
    // console.log(query);

    // this.props.history.push({ pathname: "/ship", search: query });
    this.props.history.push("/ship"); //075_01.30

    //060_12.28 Modalaa haah:
    // this.closeConfirmModal();
  };

  //043_04.22
  showConfirmModal = () => {
    this.setState({ confirmOrder: true });
  };

  closeConfirmModal = () => {
    this.setState({ confirmOrder: false });
  };
  //0.73_02.54 orstNemeh, ortsHasah odoo hereggui Ychir ni ene 2 f-iig addIngredient, removeIngredient gedeg 2 action-r hiij bgaa
  //037_17.14
  //073_08.09 deer orsNemeh, orstHasah-iig delete hiib.
  // ortsNemeh = (type) => {
  //   //console.log("====>" + type);
  //   //*********NOT!!! */
  //   // this.props.burgeriinOrts[type]++;
  //   // this.setState(this.props.burgeriinOrts);

  //   //**********YES */
  //   //037_27.55: One way to create an Object copy
  //   const newIngredients = { ...this.props.burgeriinOrts }; // 037_28.34: JS spread operation: This object /this.props.burgeriinOrts/ dotorhi byh elements zadlaad /.../ end bich gesen ug.
  //   newIngredients[type]++;

  //   // 039_03.34_start
  //   const newPrice = this.props.niitUne + INGREDIENT_PRICES[type];
  //   // 039_03.34_end

  //   this.setState({
  //     purchasing: true,
  //     totalPrice: newPrice,
  //     ingredients: newIngredients,
  //   });
  // };
  // ortsHasah = (type) => {
  //   //console.log("OrtsHasah: " + type);
  //   if (this.props.burgeriinOrts[type] > 0) {
  //     const newIngredients = { ...this.props.burgeriinOrts };
  //     newIngredients[type]--;
  //     const newPrice = this.props.niitUne - INGREDIENT_PRICES[type];
  //     this.setState({
  //       purchasing: newPrice > 0,
  //       totalPrice: newPrice,
  //       ingredients: newIngredients,
  //     });
  //   }
  // };

  render() {
    // console.log(this.props);
    //038_05.57: Disabled effect hiih
    // const disabledIngredients = { ...this.props.burgeriinOrts };
    // for (let key in disabledIngredients) {
    //   //console.log(disabledIngredients[key]);
    //   //if tegtei tentsyy bol disabledIngredients[key]=true bolno
    //   disabledIngredients[key] = disabledIngredients[key] <= 0;
    //   // console.log(key + "===>" + disabledIngredients[key]);
    // }
    // console.log("Hey", this.props);
    return (
      <div>
        <Modal
          closeConfirmModal={this.closeConfirmModal}
          show={this.state.confirmOrder}
        >
          {this.state.loading ? (
            <Spinner />
          ) : (
            <OrderSummary
              onCancel={this.closeConfirmModal}
              onContinue={this.continueOrder}
              // price={this.props.niitUne} //074_15.32 deer // bolgov. Ychir ni orderSummary ryy une damjuulah no need.
              //   ingredientsNames={this.props.ingredientNames}
              //   ingredients={this.props.burgeriinOrts}
            />
          )}
        </Modal>

        <Burger />
        {/* <Burger orts={this.props.burgeriinOrts} /> */}
        <BuildControls
          showConfirmModal={this.showConfirmModal}
          // ingredientsNames={this.props.ingredientNames}
          // 040_16.25: OrderButton
          // disabled={!this.state.purchasing}
          // disabled={!this.props.purchasing} //073_03.15
          //039_01.00
          // price={this.props.niitUne}
          // disabledIngredients={disabledIngredients}
          ortsNemeh={this.props.burgertOrtsNem}
          ortsHasah={this.props.burgereesOrtsHas}
        />
      </div>
    );
  }
}

// // const a = (state) => {
// const mapStateToProps = (state) => {
//   //072_17.00
//   return {
//     burgeriinOrts: state.ingredients,
//     niitUne: state.totalPrice,
//     purchasing: state.purchasing,
//     ingredientNames: state.ingredientNames,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     burgertOrtsNem: (ortsNer) =>
//       // dispatch({ type: "ADD_INGREDIENT", nemehOrts: ortsNer }),
//       // dispatch({ type: "ADD_INGREDIENT", ortsNer }),
//       dispatch(actions.addIngredient(ortsNer)), //0.72_12.40
//     burgereesOrtsHas: (ortsNer) =>
//       // dispatch({ type: "REMOVE_INGREDIENT", ortsNer }),
//       dispatch(actions.removeIngredient(ortsNer)), //0.72_12.40
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(BurgerPage);

export default BurgerPage;
