import React from 'react';

function Coord({pos}) {

    return (
        <p style={styles.coord}>{'('+pos[0]+', '+pos[1]+')'}</p>
    )
}

const styles = {
    "coord": {
        position:"relative",
        top:-40,
        width: 100
    }
}

export default Coord;