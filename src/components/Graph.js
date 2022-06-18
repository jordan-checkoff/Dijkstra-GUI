import React from 'react';

function Point({pos}) {
    return (
        <div style={{width: "20px",
                    height: "20px",
                    backgroundColor: "blue",
                    marginBottom: "20px",
                    position: "absolute",
                    // top: (parseInt(pos[1]) * 10).toString() + "px",
                    // left: (parseInt(pos[0]) * 10).toString() + "px"
                    top: parseInt(pos[1]) * 10,
                    left: parseInt(pos[0]) * 10
                }}></div>
    )
}

function Graph({t}) {

    return (
        <div style={{width:"100%", height:"200px", backgroundColor:"yellow"}}>
            {t.points.map((pos) => <Point key={pos} pos={pos} />)}
        </div>
    )
}

export default Graph;