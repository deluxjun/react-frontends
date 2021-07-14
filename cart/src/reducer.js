const reducer = (state, action) => {
  switch (action.type) {
    case "INCREASE": {
      console.log(action.payload);
      const newItems = state.cart.map((item) => {
        if (item.id === action.payload) {
          console.log(item.id, item.amount);
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { ...state, cart: newItems };
    }
    case "DECREASE": {
      const newItems = state.cart.map((item) => {
        if (item.id === action.payload) {
          if (item.amount > 0) return { ...item, amount: item.amount - 1 };
          else return item;
        }
        return item;
      });
      return { ...state, cart: newItems };
    }
    case "LOAD_CART": {
      return { ...state, cart: action.payload };
    }
    case "GET_TOTALS": {
      let { total, amount } = state.cart.reduce(
        (prev, current) => {
          prev.total += current.amount * current.price;
          prev.amount += current.amount;
          return prev;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      return { ...state, total, amount };
    }

    default:
      console.log(action.type);
      throw new Error("no matching action type");
  }
};

export default reducer;
