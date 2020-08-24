import React from 'react';
import { IData } from './../../../types/types';
import styles from "./style.module.scss";

type Props = {
  coinInfo: IData
}

const Coin: React.FC<Props> = ({ coinInfo: { imgUrl, price, name, fullname } }) => {
  return (
    <div className={styles.coin}>
      <div style={{
        background: `url('${imgUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }} className={styles.coin__img} />
      <p className={styles.coin__name}>{name}</p>
      <p className={styles.coin__fullname}>{fullname}</p>
      <p className={styles.coin__price}>{price}</p>
    </div>
  );
}

export default Coin;