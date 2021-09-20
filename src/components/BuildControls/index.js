import React from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/burgerActions";

import BuildControl from "../BuildControl";
import css from "./style.module.css";

const BuildControls = (props) => {
  const controls = {
    bacon: "Гахайн мах",
    cheese: "Бяслаг",
    salad: "Салад",
    meat: "Үхрийн мах",
  };

  const disabledIngredients = { ...props.burgeriinOrts };
  for (let key in disabledIngredients) {
    //console.log(disabledIngredients[key]);
    //if tegtei tentsyy bol disabledIngredients[key]=true bolno
    disabledIngredients[key] = disabledIngredients[key] <= 0;
    // console.log(key + "===>" + disabledIngredients[key]);
  }

  return (
    <div className={css.BuildControls}>
      {/* 039_01.18 */}

      <p>
        Бургерийн үнэ: <strong>{`${props.price}₮`}</strong>
      </p>

      {
        // console.log(`keys: ${Object.keys(controls)}`)
        Object.keys(props.ingredientNames).map((el) => (
          <BuildControl
            key={el}
            ortsNemeh={props.ortsNemeh}
            ortsHasah={props.ortsHasah}
            disabled={disabledIngredients}
            type={el}
            orts={props.ingredientNames[el]}
          />
        ))
      }
      {/* synthetic events 043_09.50: Jishee ni: onClick eventiig ashiglasan bol uur2 browse-yyd deer zohitsyylah asuudliig bid hariytsie!! Nice  */}
      <button
        onClick={props.showConfirmModal}
        disabled={!props.purchasing}
        className={css.OrderButton}
      >
        ЗАХИАЛАХ
      </button>
    </div>
  );
};
//074_11.05" COPY PASTE from BurgerPage
// const a = (state) => {
const mapStateToProps = (state) => {
  //072_17.00
  return {
    burgeriinOrts: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    purchasing: state.burgerReducer.purchasing,
    ingredientNames: state.burgerReducer.ingredientNames,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    ortsNemeh: (ortsNer) =>
      // dispatch({ type: "ADD_INGREDIENT", nemehOrts: ortsNer }),
      // dispatch({ type: "ADD_INGREDIENT", ortsNer }),
      dispatch(actions.addIngredient(ortsNer)), //0.72_12.40
    ortsHasah: (ortsNer) =>
      // dispatch({ type: "REMOVE_INGREDIENT", ortsNer }),
      dispatch(actions.removeIngredient(ortsNer)), //0.72_12.40
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildControls);
// export default BuildControls;
