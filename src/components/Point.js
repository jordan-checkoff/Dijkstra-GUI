import React, { useState } from 'react';
import Coord from './Coord';


function Point({pos, dims, selected, changeSelected, shortest, changeShortest, size}) {

    let [hover, setHover] = useState(false);

    function inSelected(pos) {
        for (let i=0; i < selected.length; i++) {
            if (selected[i][0] === pos[0] && selected[i][1] === pos[1]) {
                return i + 1;
            }
        }
        return false;
    }
    
    function color() {
        if (inSelected(pos)) {
            return 'blue'
        } else {
            for (let i = 0; i < shortest.length; i++) {
                if (shortest[i][0] === pos[0] && shortest[i][1] === pos[1]) {
                    return 'green';
                }
            }
            return 'red';
        }
    }
    
    function left(pos, dims) {
        let x = parseInt(pos[0]) - dims.minx;
        let max = parseInt(dims.maxx) - parseInt(dims.minx);
        return x/max * size.width + 20;
    }
    
        
    function top(pos, dims) {
        let y = parseInt(pos[1]) - dims.miny;
        let max = parseInt(dims.maxy) - parseInt(dims.miny);
        return y/max * size.height + 20;
    }

    function pointClick() {
        if (shortest.length > 0) {
            changeShortest({'roads': [], 'points': []})
            changeSelected([pos]);
        } else if (inSelected(pos, selected)) {
            let x = [...selected];
            x.splice(inSelected(pos, selected)-1,1);
            changeSelected(x);
        } else if (selected.length === 2) {
            alert('You can only select two points');
        } else {
            let x = [...selected];
            x.push(pos);
            changeSelected(x);
        }
    }

    const styles = {
        "coord": {
            position:"relative",
            top:-40,
            width: 100
        },
        "point": {
            width: "20px",
            height: "20px",
            backgroundColor: color(),
            marginBottom: "20px",
            position: "absolute",
            top: top(pos, dims),
            left: left(pos, dims),
            zIndex: 100
        }
    }

    return (
        <div style={styles.point} onClick={pointClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {hover && <Coord pos={pos} />}
        </div>
    )
}

export default Point;