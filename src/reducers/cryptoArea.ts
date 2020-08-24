import { CryptoAreaTypes } from '../types/action-strings';
import { CryptoAreaActionTypes } from '../types/types';
import { IData } from './../types/types';

interface IState {
  data: null | IData[]
}

const initialState: IState = {
  data: null,
};

const cryptoArea = (state: IState = initialState, { type, payload }: CryptoAreaActionTypes): IState => {
  switch (type) {
    case CryptoAreaTypes.SET_DATA:
      return {
        ...state,
        data: payload
      };

    default:
      return state;
  }
};

export default cryptoArea;
