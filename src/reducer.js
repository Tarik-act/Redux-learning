import {
  INCREASE,
  DECREASE,
  CLEAR_CART,
  REMOVE,
  GET_TOTALS,
  TOGGLE_AMOUNT
} from "./action";
import cartItems from "./cart-items";

const initialState = {
  cart: cartItems,
  total: 110,
  amount: 5
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, cart: [] };
    case DECREASE: {
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          cartItem = { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      });

      return { ...state, cart: tempCart };
    }
    case INCREASE:
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          cartItem = { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart };
    case REMOVE:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id)
      };
    case GET_TOTALS:
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const totalItem = price * amount;
          cartTotal.total += totalItem;
          cartTotal.amount += amount;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    case TOGGLE_AMOUNT:
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            if (action.payload.toggle === "inc") {
              return (cartItem = { ...cartItem, amount: cartItem.amount + 1 });
            }
            if (action.payload.toggle === "dec") {
              return (cartItem = { ...cartItem, amount: cartItem.amount - 1 });
            }
          }
          return cartItem;
        })
      };
    default:
      return state;
  }
}

export default reducer;

// if (action.type === CLEAR_CART) {
//   return { ...state, cart: [] };
// }
// return state;
