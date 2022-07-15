import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import InputBox from './components/InputBox';
import { tripPlanner } from './ADTs/TripPlanner';
import Graph from './components/Graph';
import './index.css';

function App() {

    const [t,changeT] = useState(new tripPlanner());
    const [shortest, changeShortest] = useState({'roads': [], 'points': []});
    const [selected, changeSelected] = useState([]);

    return (
        <div className="main" style={styles.background}>
            <Graph t={t} shortest={shortest} selected={selected} changeSelected={changeSelected} changeShortest={changeShortest} />
            <InputBox t={t} changeT={changeT} shortest={shortest} changeShortest={changeShortest} selected={selected} />
        </div>
    )
}

const styles = {
    background: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'stretch'
    }
}

const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(<App />);