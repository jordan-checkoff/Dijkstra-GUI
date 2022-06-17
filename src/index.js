import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { tripPlanner } from './ADTs/TripPlanner';


function App() {
    let [lat1, changeLat1] = useState("");
    let [lon1, changeLon1] = useState("");
    let [lat2, changeLat2] = useState("");
    let [lon2, changeLon2] = useState("");
    let [path, changePath] = useState("");
    let [t, changeT] = useState(new tripPlanner());

    function addRoad(l1, lo1, l2, lo2) {
        t.add_road([l1,lo1],[l2,lo2]);
        changeT(t);
    }

    function shortestPath(l1, lo1, l2, lo2) {
        let x = t.shortest_path([l1,lo1],[l2,lo2]);
        let y = "";
        for (let i = 0; i < x.length - 1; i++) {
            y += "("+ x[i][0] + ", " + x[i][1] + "), ";
        }
        y += "("+ x[x.length-1][0] + ", " + x[x.length-1][1] + ")";
        changePath(y);
    }

    return (
        <div>
            <input type="text" value={lat1} onChange={x => changeLat1(x.target.value)} />
            <input type="text" value={lon1} onChange={x => changeLon1(x.target.value)} />
            <input type="text" value={lat2} onChange={x => changeLat2(x.target.value)} />
            <input type="text" value={lon2} onChange={x => changeLon2(x.target.value)} />
            <button onClick={() => addRoad(lat1, lon1, lat2, lon2)}>Add Road</button>
            <button onClick={() => shortestPath(lat1, lon1, lat2, lon2)}>Shortest Path</button>
            <p>{path}</p>
        </div>
    )
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);