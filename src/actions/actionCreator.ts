import { CryptoAreaTypes } from '../types/action-strings';
import { CryptoAreaActionTypes } from '../types/types';
import { Dispatch } from 'redux';
import { REQUEST_KEY } from '../constans/';
import { IData } from '../types/types';

export const setData = (data: IData[] | null): CryptoAreaActionTypes => ({
  type: CryptoAreaTypes.SET_DATA,
  payload: data
});

export const loadCryptoData = () => async (dispatch: Dispatch<CryptoAreaActionTypes>) => {
  const params: RequestInit = {
    headers: {
      authorization: REQUEST_KEY
    }
  }

  const response: Response = await fetch('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD', params);
  const data: any = await response.json();
  const cryptoData: IData[] = data.Data.map((item: any) => {
    const { Name, ImageUrl, FullName } = item.CoinInfo;
    const { PRICE } = item.DISPLAY.USD;

    return {
      name: Name,
      imgUrl: "https://cryptocompare.com" + ImageUrl,
      price: PRICE,
      fullname: FullName
    } as IData;
  })
  dispatch(setData(cryptoData))
}