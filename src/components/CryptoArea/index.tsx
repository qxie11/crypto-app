import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { loadCryptoData, setData } from "../../actions/actionCreator";
import { RootState } from "../../reducers";
import Coin from "./Coin";
import TopBar from './TopBar';
import Calculator from '../Calculator';
import Loading from './Loading';
import styles from "./style.module.scss";
import { IData } from './../../types/types';

type CryptoAreaProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const CryptoArea: React.FC<CryptoAreaProps> = ({ loadCryptoData, data, setData }) => {
    const updateCrypto = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {

        loadCryptoData();
        updateCrypto.current = setInterval(() => {
            setData(null);
            loadCryptoData();
        }, 60000)

        return () => {
            clearInterval(updateCrypto.current as any);
        }
    }, []);

    return (
        <>
            <div className={styles.area}>
                {data ? <><TopBar data={data} setData={setData} />
                    {
                        data.map((coinInfo: IData) => <Coin key={coinInfo.name} coinInfo={coinInfo} />)
                    }</> : <Loading />}
            </div>
            {data && <Calculator data={data} />}
        </>
    );
}

const mapStateToProps = ({ cryptoArea: { data } }: RootState) => {
    return {
        data
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
    {
        loadCryptoData,
        setData
    },
    dispatch
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(CryptoArea));