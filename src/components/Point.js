import React from 'react';

function Point({pos, dims, changeClicked}) {

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

    return (
        <div style={{width: "20px",
                    height: "20px",
                    backgroundColor: "blue",
                    marginBottom: "20px",
                    position: "absolute",
                    top: top(pos, dims),
                    left: left(pos, dims)
                }
            }
            onClick={() => changeClicked("(" + pos[0] + ', ' + pos[1] + ')')}></div>
    )
}

export default Point;