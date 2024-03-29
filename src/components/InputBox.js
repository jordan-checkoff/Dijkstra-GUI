import React, {useState} from 'react';
import PositionInput from './PositionInput';
import { tripPlanner } from '../ADTs/TripPlanner';


function ShortestInput({num, selected}) {
    return (
        <div style={{marginBottom:"10px", marginTop:"10px", display:'flex', alignItems: 'center'}}>
            <label style={styles.marginRight}>Endpoint {num}:</label>
            <p style={{margin: "0 5px"}}>{selected.length > num-1 ? "(" + selected[num-1][0] + "," : ''}</p>
            <p style={{margin: "0"}}>{selected.length > num-1 ? selected[num-1][1] + ")" : ''}</p>
        </div>
    )
}


function InputBox({t,changeT, shortest, changeShortest, selected}) {

    let [lat1, changeLat1] = useState("");
    let [lon1, changeLon1] = useState("");
    let [lat2, changeLat2] = useState("");
    let [lon2, changeLon2] = useState("");
    let [time, changeTime] = useState("");
    let [nroads, changenroads] = useState("");
    let [noroute, changenoroute] = useState(false);

    // function average() {
    //     let points = t.points;
    //     let total = 0;
    //     let num = 0;
    //     for (let h=0; h < 1; h++) {
    //         for (let i=0; i < points.length; i++) {
    //             for (let j=0; j < points.length; j++) {
    //                 let start = performance.now();
    //                 t.shortest_path(points[i], points[j]);
    //                 let end = performance.now();
    //                 let diff = end-start;
    //                 total += diff;
    //                 num++;
    //             }
    //             console.log(i);
    //         }
    //     }
    //     let average = total / num;
    //     console.log(average);
    // }

    function arrayToCoord() {
        let output = "";
        for (let i=0; i < shortest["points"].length; i++) {
            output += "(" + shortest["points"][i][0] + ", " + shortest["points"][i][1] + ") => ";
        }
        return output.slice(0, -3);
    }

    function addRoad(l1, lo1, l2, lo2) {
        let y = t.add_road([l1,lo1],[l2,lo2]);
        changeT(y);
    }

    function shortestPath(l1, lo1, l2, lo2) {
        let start = performance.now()
        let x = t.shortest_path([l1,lo1],[l2,lo2]);
        let end = performance.now();
        let difference = end - start;
        let y = [];
        if (x) {
            for (let i = 0; i < x.length - 1; i++) {
                y.push(x[i].toString() + ", " + x[i+1].toString());
            }
            changeShortest({'roads': y, 'points': x});
            changenoroute(false);
        } else {
            changenoroute(true);            
        }
        changeTime(difference.toString() + " ms")

    }

    function addRandom(nroads) {
        let nt = new tripPlanner();
        let len = 10 + nroads / 2;
        let npoints = nroads;
        if (nroads < 3) {
            npoints = 3;
        }
        let points = [];
        let pointsdict = {};
        for (let i=0; i < npoints; i++) {
            let c1 =  Math.floor(Math.random() * len).toString();
            let c2 =  Math.floor(Math.random() * len).toString();
            if (c1 === c2 || pointsdict[[c1, c2]]) {
                i--;
            } else {
                points.push([c1, c2]);
                pointsdict[[c1, c2]] = true;
            }
        }

        let roadsdict = {}

        for (let i=0; i < nroads; i++) {
            let p1 = Math.floor(Math.random() * points.length);
            let p2 = Math.floor(Math.random() * points.length);
            if (p1===p2 || roadsdict[[points[p1], points[p2]]] || roadsdict[[points[p2], points[p1]]]) {
                i--;
            } else {
                nt.add_road(points[p1], points[p2]);
                roadsdict[[points[p1],points[p2]]] = true;
            }
        }

        changeT(nt);

    }

    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarsect}>
                <h2>Add Roads</h2>
                <PositionInput num="1" lat={lat1} lon={lon1} changeLat={changeLat1} changeLon={changeLon1} />
                <PositionInput num="2" lat={lat2} lon={lon2} changeLat={changeLat2} changeLon={changeLon2} />
                <button style={{width: '100%'}} onClick={() => addRoad(lat1, lon1, lat2, lon2)}>Add Road</button>
                <p style={{textAlign:"center"}}>or</p>
                <div style={{display:'flex', justifyContent: 'space-between'}}>
                    <input style={{width: "45%"}} type="text" placeholder={"# of roads"} value={nroads} onChange={x => changenroads(x.target.value)} />
                    <button style={{width: '45%'}} onClick={() => addRandom(nroads)}>Add Random Roads</button>
                </div>
            </div>

            <hr style={styles.divider} />
            
            <div style={styles.sidebarsect}>
                <h2>Find Shortest Path</h2>
                <p>Click two points to find the shortest path between them.</p>
                <ShortestInput num="1" selected={selected} />
                <ShortestInput num="2" selected={selected} />
                <button style={{width: '100%'}} onClick={() => shortestPath(selected[0][0], selected[0][1], selected[1][0], selected[1][1])}>Calculate Shortest Path</button>
                <p>{noroute && "There is no path that connects those two points."}</p>
                <p>Shortest path:</p>
                <div style={{overflowX: 'scroll', overflowY: 'scroll', width: '100%', height: 40, backgroundColor: 'lightgray', border: '2px solid gray', padding: 5}}>
                    <p style={{display: "inline-block", margin: "0 4px"}}>{arrayToCoord()}</p>
                </div>
            </div>

            <hr style={styles.divider} />

            <div style={styles.sidebarsect}>
                <h2>Analyze Results</h2>
                <p>{time}</p>
                {/* <button onClick={average}>Average</button> */}
            </div>
        </div>
    )
}

const styles = {
    sidebar: {
        backgroundColor: '#a9b4eb',
        padding: '10px 20px',
        overflowY: 'scroll'
    },
    divider: {
        border: '1px ridge darkblue',
        margin: '40px 0 20px 0'
    },
    marginRight: {
        marginRight: "10px"
    },
    sidebarsect: {
        width: '100%'
    }
}

export default InputBox;