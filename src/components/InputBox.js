import React, {useState} from 'react';
import PositionInput from './PositionInput';


function ShortestInput({num, selected}) {
    return (
        <div style={{marginBottom:"10px", marginTop:"10px", display:'flex', alignItems: 'center'}}>
            <label style={styles.marginRight}>Endpoint {num}:</label>
            <p style={styles.marginRight}>{selected.length > num-1 ? selected[num-1][0] : ''}</p>
            <p>{selected.length > num-1 ? selected[num-1][1] : ''}</p>
        </div>
    )
}

let styles = {
    marginRight: {
        marginRight: "10px"
    }
}

function InputBox({t,changeT, shortest, changeShortest, selected}) {

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
            <div style={{borderBottom:'2px groove lightgray', paddingBottom: '20px'}}>
                <h2>Add Road</h2>
                <PositionInput num="1" lat={lat1} lon={lon1} changeLat={changeLat1} changeLon={changeLon1} />
                <PositionInput num="2" lat={lat2} lon={lon2} changeLat={changeLat2} changeLon={changeLon2} />
                <button style={{width: '100%'}} onClick={() => addRoad(lat1, lon1, lat2, lon2)}>Add Road</button>
            </div>
            
            <div>
                <h2>Find Shortest Path</h2>
                <p>Click two points to find the shortest path between them.</p>
                <ShortestInput num="1" selected={selected} />
                <ShortestInput num="2" selected={selected} />
                <button style={{width: '100%'}} onClick={() => shortestPath(selected[0][0], selected[0][1], selected[1][0], selected[1][1])}>Shortest Path</button>
            </div>
        </div>
    )
}

export default InputBox;