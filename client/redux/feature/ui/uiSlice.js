// uiSlice.js
import { createSlice } from "@reduxjs/toolkit"

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    open: false,
    activeItem: 0,
    route: "Login",
  },
  reducers: {
    setOpen: (state, action) => { state.open = action.payload },
    setActiveItem: (state, action) => { state.activeItem = action.payload },
    setRoute: (state, action) => { state.route = action.payload },
  }
})

export const { setOpen, setActiveItem, setRoute } = uiSlice.actions
export default uiSlice.reducer
