import React from 'react'

function RefreshButton({onRefresh}) {

    return (
        <button onClick={onRefresh} className="btn btn-info mt-5">Refresh</button>
    )
}

export default RefreshButton