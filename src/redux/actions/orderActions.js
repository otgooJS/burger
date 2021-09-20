import axios from "../../axios-orders";

export const loadOrders = (userId) => {
  // console.log("order load action...");
  // return {
  //   type: "LOAD_ACTIONS",
  // };
  return function (dispatch, getState) {
    //Notify that orders're started, and then after receiving this notification, spinner starts to run...
    dispatch(loadOrdersStart());
    const token=getState().signupLoginReducer.token;
    // console.log("111====>", token);
    axios
      .get(
        // 088_15.00
        // `orders.json?orderBy="userId"&equalTo="W1hwo38KeYgpVA4uff65UdofEHX2"`
        // `orders.json?orderBy="userId"&equalTo="${userId}"` 
        `orders.json?&auth=${token}&orderBy="userId"&equalTo="${userId}"`//089_03.30 auth added
        
      )
      .then((response) => {
        const loadedOrders = Object.entries(response.data).reverse();
        dispatch(loadOrdersSuccess(loadedOrders));
        // 058_06.30 function that converts an object into a massive:
        // this.setState({ orders: Object.entries(response.data).reverse() });
      })
      // .catch((err) => console.log(err));
      .catch((err) => dispatch(loadOrdersError(err)));
  };
};

export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START",
  };
};
export const loadOrdersSuccess = (loadedOrders) => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    orders: loadedOrders,
  };
};
export const loadOrdersError = (error) => {
  return {
    type: "LOAD_ORDERS_ERROR",
    error,
  };
};

//080_02.20 Захиалгыг хадгалах

export const saveOrder = (newOrder) => {
  return function (dispatch, getState) {
    //Spinner starts spinning...
    dispatch(saveOrderStart());
    const token=getState().signupLoginReducer.token;

    // save to firebase
    axios
      // .post(`orders.json`, newOrder)
      .post(`orders.json?&auth=${token}`, newOrder) //089_11.26 token added

      // .post(
      //   `https://burger-9b5fd-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json`,
      //   order
      // )
      .then((response) => {
        dispatch(saveOrderSuccess());
        // alert(`Susseccfully saved`);
      })
      .catch((error) => {
        dispatch(saveOrderError(error));
        // console.log("order not succeed: " + error);
      });
    //   .finally(() => {
    //     this.setState({ loading: false });
    //     // 063_22.00 jump to orders page
    //     this.props.history.replace("/orders");
    //   });
  };
};
export const saveOrderStart = () => {
  return {
    type: "SAVE_ORDER_START",
  };
};
export const saveOrderSuccess = () => {
  return {
    type: "SAVE_ORDER_SUCCESS",
  };
};
export const saveOrderError = (error) => {
  return {
    type: "SAVE_ORDER_ERROR",
    errorMessage: error,
  };
};
