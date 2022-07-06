import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import InputBox from './components/InputBox';
import { tripPlanner } from './ADTs/TripPlanner';
import Graph from './components/Graph';

function App() {

    let [t,changeT] = useState(new tripPlanner());
    let [shortest, changeShortest] = useState([]);
    const [selected, changeSelected] = useState([]);

    return (
        <div style={{width: '100%', height: '90vh', display: 'flex', justifyContent: 'space-around', alignItems: 'stretch'}}>
            <Graph t={t} shortest={shortest} selected={selected} changeSelected={changeSelected} />
            <InputBox t={t} changeT={changeT} shortest={shortest} changeShortest={changeShortest} selected={selected} />
        </div>
    )
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);