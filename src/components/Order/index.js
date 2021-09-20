import React from "react";
import css from "./style.module.css";

const Order = (props) => {
  //   console.log(props.order);
  return (
    <div className={css.Order}>
      <p>
        Хаяг: {props.order.hayag.name} | {props.order.hayag.street} |
        {props.order.hayag.city}
      </p>
      <p>
        Орц: Гахайн мах: {props.order.orts.bacon}, Салад:
        {props.order.orts.salad}, Бяслаг: {props.order.orts.cheese}, Мах:
        {props.order.orts.meat}
      </p>

      <p>
        Үнийн дүн: <strong>{props.order.dun}₮</strong>
      </p>
    </div>
  );
};

export default Order;
