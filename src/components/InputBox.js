import React, {useState} from 'react';
import PositionInput from './PositionInput';

function InputBox({t,changeT, shortest, changeShortest}) {

    let [lat1, changeLat1] = useState("");
    let [lon1, changeLon1] = useState("");
    let [lat2, changeLat2] = useState("");
    let [lon2, changeLon2] = useState("");

    function addRoad(l1, lo1, l2, lo2) {
        let y = t.add_road([l1,lo1],[l2,lo2]);
        changeT(y);
    }

    function shortestPath(l1, lo1, l2, lo2) {
        let x = t.shortest_path([l1,lo1],[l2,lo2]);
        let y = []
        for (let i = 0; i < x.length - 1; i++) {
            y.push(x[i].toString() + ", " + x[i+1].toString());
        }
        changeShortest(y);
    }

    return (
        <div style={{backgroundColor: 'lightgray', padding: 20}}>
            <PositionInput num="1" lat={lat1} lon={lon1} changeLat={changeLat1} changeLon={changeLon1} />

            <PositionInput num="2" lat={lat2} lon={lon2} changeLat={changeLat2} changeLon={changeLon2} />

            <button style={{marginRight: 10}} onClick={() => addRoad(lat1, lon1, lat2, lon2)}>Add Road</button>
            <button onClick={() => shortestPath(lat1, lon1, lat2, lon2)}>Shortest Path</button>
            {/* <p>{shortest}</p> */}
        </div>
    )
}

export default InputBox;