import React from 'react';

function PositionInput({num, lat, lon, changeLat, changeLon}) {
    return (
        <div style={{marginBottom:"10px", marginTop:"10px", display: 'flex', justifyContent: 'space-between'}}>
            <label>Endpoint {num}:</label>
                <input type="text" placeholder="latitude" value={lat} onChange={x => changeLat(x.target.value)} />
                <input type="text" placeholder="longitude" value={lon} onChange={x => changeLon(x.target.value)} />
        </div>
    )
}

export default PositionInput;