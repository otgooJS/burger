const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0,
  },
  totalPrice: 0,
  purchasing: false,
  ingredientNames: {
    bacon: "Гахайн мах",
    cheese: "Бяслаг",
    salad: "Салад",
    meat: "Үхрийн мах",
  },
};

const INGREDIENT_PRICES = { salad: 150, cheese: 250, bacon: 800, meat: 1500 }; // 039_02.12

const reducer = (state = initialState, action) => {
  console.log("reducerees", action);
  if (action.type === "ADD_INGREDIENT") {
    // console.log(action.nemehOrts);
    return {
      ...state, //073_13.30
      ingredients: {
        // salad: 1,
        // cheese: 0,
        // bacon: 1,
        // meat: 2,
        ...state.ingredients,
        // bacon: state.ingredients.bacon + 1,
        [action.ortsNer]: state.ingredients[action.ortsNer] + 1,
      },
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ortsNer],
      purchasing: true,
    };
  } else if (action.type === "REMOVE_INGREDIENT") {
    const newPrice = state.totalPrice - INGREDIENT_PRICES[action.ortsNer];
    return {
      ...state,
      ingredients: {
        ...state.ingredients,

        [action.ortsNer]: state.ingredients[action.ortsNer] - 1,
      },
      totalPrice: newPrice,
      purchasing: newPrice > 0,
    };
  }
  return state;
};

export default reducer;
