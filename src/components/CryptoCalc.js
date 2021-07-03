import { useEffect } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faEthereum
  } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faEthereum);

const ETHERMINE_DIFF_API_URL = "https://api.ethermine.org/blocks/History";
const ETHERMINE_PRICE_API_URL = "https://api.ethermine.org/poolStats";

function ResultsTable(props) {
    if (props.netProfitPerDay > 0){
        var profitsClassName = "table-success";
    } else {
        // eslint-disable-next-line
        var profitsClassName = "table-danger";
    }
    return (
        <>
            <b>Current <FontAwesomeIcon icon={faEthereum} /> price (USD): ${props.ethPrice}</b>
            <table className="table table-bordered table-hover">
                <tbody>
                    <tr className="table-success">
                        <td>Coins mined per day</td>
                        <td>{props.coinsPerDay} <FontAwesomeIcon icon={faEthereum} /></td>
                    </tr>
                    <tr className="table-success">
                        <td>Gross profits per day</td>
                        <td>${props.grossProfitsPerDay}</td>
                    </tr>
                    <tr className="table-danger">
                        <td>Energy costs per day</td>
                        <td>${props.powerCostPerDay}</td>
                    </tr>
                    <tr className={profitsClassName}>
                        <td>Net profit per day</td>
                        <td>${props.netProfitPerDay}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

function CryptoCalc() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [difficulty, setDifficulty] = useState(0);
    const [ethPrice, setEthPrice] = useState(0);
    const [error, setError] = useState(null);
    const [hashingPower, setHashingPower] = useState(0);
    const [powerConsumption, setPowerConsumption] = useState(0);
    const [costPerKWh, setCostPerKWh] = useState(0);
    const [poolFee, setPoolFee] = useState(0);

    // const [coinsPerDay, setCoinsPerDay] = useState(0);
    // const [grossProfitsPerDay, setGrossProfitsPerDay] = useState(0);
    // const [powerCostPerDay, setPowerCostPerDay] = useState(0);
    // const [netProfitPerDay, setNetProfitPerDay] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        // setCoinsPerDay(((2 * hashingPower * Math.pow(10, 6) * 86400)/difficulty) * (1 - poolFee/100))
        // setGrossProfitsPerDay(ethPrice * coinsPerDay);
        // setPowerCostPerDay(24*(1/1000)*costPerKWh*powerConsumption);
        // setNetProfitPerDay(grossProfitsPerDay-powerCostPerDay);
        var coinsPerDay = ((2.89761 * hashingPower * Math.pow(10, 6) * 86400)/difficulty) * (1 - poolFee/100);
        var grossProfitsPerDay = ethPrice * coinsPerDay;
        var powerCostPerDay = 24*(1/1000)*costPerKWh*powerConsumption;
        var netProfitPerDay = grossProfitsPerDay-powerCostPerDay;

        const component = <ResultsTable ethPrice={ethPrice.toFixed(4)} coinsPerDay={coinsPerDay.toFixed(4)} grossProfitsPerDay={grossProfitsPerDay.toFixed(4)} powerCostPerDay={powerCostPerDay.toFixed(4)} netProfitPerDay={netProfitPerDay.toFixed(4)} />
        ReactDOM.render(component, document.getElementById('results-table'));
    }
    
    useEffect(() => {
        fetch(ETHERMINE_DIFF_API_URL)
            .then(res => res.json())
            .then(
                (result) => {
                    setDifficulty(result['data'][0]['difficulty']);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
            fetch(ETHERMINE_PRICE_API_URL)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setEthPrice(result['data']['price']['usd'])
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                );
    }, [])

    if (error) {
        return (
            <div className="container">
                <div className="card form-card" style={{"maxWidth": "75%", "verticalAlign": "middle"}}>
                    <div className="card-body">
                        <div>Error: {error.message}</div>
                    </div>
                </div>
            </div>
        );
    } else if (!isLoaded) {
        return (
            <div className="container">
                <div className="card form-card" style={{"maxWidth": "75%", "verticalAlign": "middle"}}>
                    <div className="card-body">
                        <div>Loading...</div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="card form-card" style={{"maxWidth": "75%", "verticalAlign": "middle"}}>
                    <div className="card-body">
                        <h2><FontAwesomeIcon icon={faEthereum} /> Mining Profitability Calculator</h2><br />
                        <form onSubmit={e => { handleSubmit(e) }}>
                            <div className="form-row crypto-calc-row">
                                <div className="col-md-3">
                                    <label htmlFor="hashing_power">Hashing Power</label>
                                </div>
                                <div className="col-md-6 form-inline">
                                    <input type="number" className="form-control crypto-calc-input" id="hashing_power" placeholder="Hashing power in MH/s" value={hashingPower} onChange={e => setHashingPower(e.target.value)}/> &nbsp;&nbsp;MH/s
                                </div>
                            </div>
                            <div className="form-row crypto-calc-row">
                                <div className="col-md-3">
                                    <label htmlFor="power_consumption">Power Consumption</label>
                                </div>
                                <div className="col-md-6 form-inline">
                                    <input type="number" className="form-control crypto-calc-input" id="power_consumption" placeholder="Power consumption in W" value={powerConsumption} onChange={e => setPowerConsumption(e.target.value)}/> &nbsp;&nbsp;W
                                </div>
                            </div>
                            <div className="form-row crypto-calc-row">
                                <div className="col-md-3">
                                    <label htmlFor="cost_per_KWh">Cost per KWh</label>
                                </div>
                                <div className="col-md-6 form-inline">
                                    <input type="number" className="form-control crypto-calc-input" id="cost_per_KWh" placeholder="Cost per KWh in $" value={costPerKWh} onChange={e => setCostPerKWh(e.target.value)}/> &nbsp;&nbsp;$
                                </div>
                            </div>
                            <div className="form-row crypto-calc-row">
                                <div className="col-md-3">
                                    <label htmlFor="pool_fee">Pool Fee</label>
                                </div>
                                <div className="col-md-6 form-inline">
                                    <input type="number" className="form-control crypto-calc-input" id="pool_fee" placeholder="Pool fee in %" value={poolFee} onChange={e => setPoolFee(e.target.value)}/> &nbsp;&nbsp;%
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Calculate</button>
                        </form>
                        <br />
                        <div id="results-table"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CryptoCalc;