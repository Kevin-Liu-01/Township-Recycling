import { configureStore } from '@reduxjs/toolkit'
import componentReducer from './storeSlice'

export default configureStore({
  reducer: {
    component:componentReducer,
  },
})