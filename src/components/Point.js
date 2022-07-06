import React, { useState } from 'react';

function Coord({pos}) {
    return (
        <p style={{position:"relative", top:-40, width: 100}}>{'('+pos[0]+', '+pos[1]+')'}</p>
    )
}

function Point({pos, dims, selected, changeSelected}) {

    let [hover, setHover] = useState(false);
    let [sel, setSel] = useState(false);

    function left(pos, dims) {
        let x = parseInt(pos[0]) - dims.minx;
        let max = parseInt(dims.maxx) - parseInt(dims.minx);
        return (x/max * 100).toString() + "%";
    }
    
    function top(pos, dims) {
        let y = parseInt(pos[1]) - dims.miny;
        let max = parseInt(dims.maxy) - parseInt(dims.miny);
        return (y/max * 100).toString() + "%";
    }

    function inSelected(pos) {
        for (let i=0; i < selected.length; i++) {
            if (selected[i][0] === pos[0] && selected[i][1] === pos[1]) {
                return i + 1;
            }
        }
        return false;
    }

    function pointClick() {
        if (inSelected(pos)) {
            let x = [...selected];
            x.splice(inSelected(pos)-1,1);
            changeSelected(x);
            setSel(false);
        } else if (selected.length === 2) {
            console.log('you can only select two points');
        } else {
            let x = [...selected];
            // for (let i = 0; i < selected.length; i++) {
            //     x[i] = [selected[i][0], selected[i][1]];
            // }
            x.push(pos);
            console.log(x);
            changeSelected(x);
            setSel(true);
        }
    }

    return (
        <div style={{width: "20px",
                    height: "20px",
                    backgroundColor: sel ? "green" : "blue",
                    marginBottom: "20px",
                    position: "absolute",
                    top: top(pos, dims),
                    left: left(pos, dims),
                zIndex: 100}}
            onClick={pointClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>

                {hover && <Coord pos={pos} />}

        </div>
    )
}

export default Point;