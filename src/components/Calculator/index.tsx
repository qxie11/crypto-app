import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { IData } from './../../types/types';

type CalculatorProps = {
  data: IData[]
}

const Calculator: React.FC<CalculatorProps> = ({ data }) => {
  const select1 = useRef<HTMLSelectElement | null>(null);
  const select2 = useRef<HTMLSelectElement | null>(null);
  const [result, setResult] = useState<string>('');

  const updateCount = () => {
    const select1Value: string = select1.current!.options[select1.current!.selectedIndex].value;
    const select2Value: string = select2.current!.options[select2.current!.selectedIndex].value;
    let select1Price: any;
    let select2Price: any;
    for (let coin of data) {
      if ((coin.name !== select1Value) && (coin.name !== select2Value)) continue;
      const price = coin.price.substring(2).replace(',', '');
      coin.name === select1Value ? select1Price = +price : select2Price = +price;
    }
    let newResult: Partial<string>;
    if (!select2Price) {
      const usdPrice: IData[] = data.filter(coin => coin.name === select1Value);
      newResult = `${select1Value} = ${usdPrice[0].price} USD`;
    } else {
      newResult = `${select1Value} = ${(select1Price! / select2Price).toFixed(3)} ${select2Value} `;
    }
    setResult(newResult)
  }

  useEffect(updateCount, []);

  return (
    <div className={styles.calculator}>
      <p className={styles.calculator__display}>{result}</p>
      <select className={styles.calculator__select1} onChange={updateCount} ref={select1}>
        {
          data.map(({ name }) => <option value={name} key={name}>{name}</option>)
        }
      </select>
      <select className={styles.calculator__select2} onChange={updateCount} ref={select2}>
        <option>USD</option>
        {
          data.map(({ name }) => <option value={name} key={name}>{name}</option>)
        }
      </select>
    </div>
  );
}

export default Calculator;