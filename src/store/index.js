import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import dialogSlice from "./dialogSlice";
import MessageSlice from "./messageSlice";
import drawerSlice from "./drawerSlice";

export const store = configureStore({
    reducer: {
        dialog: dialogSlice.reducer,
        auth : authSlice.reducer,
        message : MessageSlice.reducer,
        leftDrawer: drawerSlice.reducer,
    }
})

