import React from "react";
import Shadow from "../Shadow";
import css from "./style.module.css";

// 043_12.00 inline style part:
const Modal = (props) => (
  <div>
    <Shadow show={props.show} darahad={props.closeConfirmModal} />
    <div
      //   onClick={props.closeConfirmModal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
      className={css.Modal}
    >
      {props.children}
    </div>
  </div>
);
export default Modal;
