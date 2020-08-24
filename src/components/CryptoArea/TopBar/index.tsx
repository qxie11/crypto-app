import React, { useState } from 'react';
import { IData, ISetData } from '../../../types/types';
import styles from "./style.module.scss";
import Arrow from "../../../images/arrow.png";

type Props = {
  data: IData[],
  setData: (data: IData[]) => ISetData
}

const TopBar: React.FC<Props> = ({ data, setData }) => {
  const [isSorted, setSorted] = useState<boolean>(false);

  const sortCoins = () => {
    data.sort((a: any, b: any) => {
      const priceA = a.price.substring(2).replace(',', '');
      const priceB = b.price.substring(2).replace(',', '');
      return isSorted ? priceA - priceB : priceB - priceA;
    })
    setSorted(!isSorted);
    const sortedData: IData[] = [...data];
    setData(sortedData);
  }

  return (
    <div className={styles.topbar}>
      <div className={styles.topbar__name}>Name</div>
      <div className={styles.topbar__fullname}>FullName</div>
      <div className={styles.topbar__price} onClick={sortCoins}>Price <img className={isSorted ? styles.sorted : ''} src={Arrow} alt="arrow" /></div>
    </div>
  );
}

export default TopBar;