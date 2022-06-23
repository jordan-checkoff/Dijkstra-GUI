import React from 'react';


function Road({road, dims, path, size}) {

    function left(pos, dims) {
        let x = parseInt(pos[0]) - dims.minx;
        let max = parseInt(dims.maxx) - parseInt(dims.minx);
        return (x/max * size.width);
    }
    
    function top(pos, dims) {
        let y = parseInt(pos[1]) - dims.miny;
        let max = parseInt(dims.maxy) - parseInt(dims.miny);
        return (y/max * size.height);
    }

    function width() {
        let x1 = left(road[0], dims);
        let x2 = left(road[1], dims);
        let y1 = top(road[0], dims);
        let y2 = top(road[1], dims);

        let w = Math.sqrt((x2-x1)**2+(y2-y1)**2);
        return w;
    }

    function roadLeft(road) {
        let x1 = left(road[0], dims);
        let x2 = left(road[1], dims);;
        return (x1 + x2)/2 - width()/2;
    }

    function roadTop() {
        let y1 = top(road[0], dims);
        let y2 = top(road[1], dims);
        return (y1 + y2)/2;
    }

    function angle() {
        let opp = (top(road[1],dims) - top(road[0], dims));
        let adj = (left(road[1], dims)-left(road[0], dims));
        let ang = Math.atan(opp/adj);
        return ang;
    }

    function included() {
        let r1 = road[0][0].toString() + "," + road[0][1].toString() + ", " + road[1][0].toString() + "," + road[1][1].toString()
        let r2 = road[1][0].toString() + "," + road[1][1].toString() + ", " + road[0][0].toString() + "," + road[0][1].toString()
        return path.includes(r1) || path.includes(r2);
    }

    return (
        <div style={{
            width: width(),
            height: "1px",
            backgroundColor: included() ? "green" : "red",
            borderWidth: '1px',
            borderStyle: 'solid', 
            borderColor: included() ? "green" : "red",
            position: "absolute",
            top: roadTop(),
            left: roadLeft(road),
            transform: 'rotate(' + angle() + 'rad)'
        }}>
        </div>
    )
}

export default Road;