import { CryptoAreaTypes } from "./action-strings";

export interface IData {
    name: string,
    imgUrl: string,
    price: string,
    fullname: string
}

export interface ISetData {
    type: typeof CryptoAreaTypes.SET_DATA;
    payload: null | IData[];
}

export type CryptoAreaActionTypes = ISetData;

export type AppActionType = CryptoAreaActionTypes;