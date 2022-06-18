import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import InputBox from './components/InputBox';
import { tripPlanner } from './ADTs/TripPlanner';
import Graph from './components/Graph';

function App() {

    let [t,changeT] = useState(new tripPlanner());

    return (
        <div>
            <Graph t={t} />
            <InputBox t={t} changeT={changeT} />
        </div>
    )
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);