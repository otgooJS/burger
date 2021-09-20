import react from "react";
import { connect } from "react-redux";

import BurgerIngredient from "../BurgerIngredient";
import css from "./style.module.css";

import { withRouter } from "react-router-dom"; //060_05.00

const Burger = (props) => {
  //props.orts;
  // console.log(props.orts);
  //036_13.40: massive elements-yydiig extract hiigeed gargaad irne...Mash chuhal
  //{salad: 1, cheese: 2, bacon: 2, meat: 1 }
  //props.orts gedeg umiig Object-iin entries gedeg f-eer zadlaad items gedeg massive yysgie gesen ug.
  const items = Object.entries(props.orts);
  // console.log(items);

  let content = [];
  items.map((el) => {
    // console.log(el[1]);
    for (let i = 0; i < el[1]; i++)
      content.push(<BurgerIngredient key={`${el[0]}${i + 1}`} type={el[0]} />);
  });

  if (content.length === 0) content = <p>Хачиртай талхны орцоо сонгоно уу..</p>;

  // console.log(props);
  return (
    <div className={css.Burger}>
      <BurgerIngredient type="bread-top" />
      {content}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    orts: state.burgerReducer.ingredients,
  };
};
export default connect(mapStateToProps)(withRouter(Burger));
