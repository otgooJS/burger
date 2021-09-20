// 072_10.00 action-uudiig neg dor hiichyyl daraa ni end tendees haihgui amar!!
//BurgerPage
export const addIngredient = (ortsNer) => {
  return {
    type: "ADD_INGREDIENT",
    ortsNer,
  };
};
export const removeIngredient = (ortsNer) => {
  return {
    type: "REMOVE_INGREDIENT",
    ortsNer,
  };
};
