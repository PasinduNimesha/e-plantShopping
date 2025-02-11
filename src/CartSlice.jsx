import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost, description } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ 
          name, 
          image, 
          description,
          cost: parseFloat(cost.replace('$', '')),
          quantity: 1 
        });
      }
      // Update total
      state.total = state.items.reduce((sum, item) => 
        sum + (item.cost * item.quantity), 0);
    },
    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter(item => item.name !== name);
      // Update total
      state.total = state.items.reduce((sum, item) => 
        sum + (item.cost * item.quantity), 0);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.name !== name);
        }
        // Update total
        state.total = state.items.reduce((sum, item) => 
          sum + (item.cost * item.quantity), 0);
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export const selectCartItems = state => state.cart.items;
export const selectCartTotal = state => state.cart.total;
export const selectCartItemsCount = state => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default CartSlice.reducer;