import { configureStore } from '@reduxjs/toolkit'
import productCounterReducer from './productImageSlice'
import addToCartReducer from './addToCartSlice'
import changeThemeReducer from './changeThemeSlice'
import changeImageReducer from './productImageSlice'
import changeLangReducer from './changeLangSlice'
import switchToProductPageReducer from './switchToProductPageSlice'
import sideBarReducer from './sideBarSlice'
import authReducer from './authSlice'
import refreshReducer from './refreshSlice'

export const store = configureStore({
  reducer: {
    productCounter: productCounterReducer,
    addToCart:addToCartReducer,
    changeTheme:changeThemeReducer,
    productImage:changeImageReducer,
    changeLang:changeLangReducer,
    switchToProductPage:switchToProductPageReducer,
    sideBar:sideBarReducer,
    auth:authReducer,
    refresh:refreshReducer

  },
})
