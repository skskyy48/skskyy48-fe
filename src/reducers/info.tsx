import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    name : string,
    id : string,
    isLogin : boolean
}

const initialState: UserState = {
    name : '',
    id : '',
    isLogin : false
}

export const info = createSlice({
    name : 'info',
    initialState,
    reducers : {
        setInfo:(state: UserState, action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.id = action.payload.id;
        },
        setIsLogin:(state: UserState, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload
        }
    }
});

export const {setInfo, setIsLogin} = info.actions