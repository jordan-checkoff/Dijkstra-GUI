import React from 'react';

function PositionInput({num, lat, lon, changeLat, changeLon}) {
    return (
        <div style={{marginBottom:"10px", marginTop:"10px"}}>
            <label style={styles.marginRight}>Endpoint {num}:</label>
            <input style={styles.marginRight} type="text" placeholder="latitude" value={lat} onChange={x => changeLat(x.target.value)} />
            <input type="text" placeholder="longitude" value={lon} onChange={x => changeLon(x.target.value)} />
        </div>
    )
}

let styles = {
    marginRight: {
        marginRight: "10px"
    }
}

export default PositionInput;