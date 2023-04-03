import React, { useContext } from 'react';

import { EHRContext } from "../context/ehrContext";

const Records = () => {
    const {
        recordList
    } = useContext(EHRContext);

    return(
        recordList.map((r)=>{return(<div>Record id: {r.rec_id.toString()}, timestamp: {r.time_stamp.toNumber()}</div>);}) 
    );
}

export default Records;