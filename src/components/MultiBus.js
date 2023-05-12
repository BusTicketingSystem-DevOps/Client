import React from 'react';
import { useNavigate } from "react-router-dom";

function MultiBus({multibus}) {
    const navigate = useNavigate();
  return (
    <div className="card">
    <div className="p-2">
      <h1 className="text-lg secondary-text">{multibus[0].name}</h1>
      <hr />
      <div className="d-flex justify-content-between">
        <div>
          <p className="text-sm">From</p>
          <p className="text-sm">{multibus[0].from}</p>
        </div>

        <div>
          <p className="text-sm">To</p>
          <p className="text-sm">{multibus[0].to}</p>
        </div>

        <div>
          <p className="text-sm">Fare</p>
          <p className="text-sm">₹ {multibus[0].fare} /-</p>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <p className="text-sm">Journey Date</p>
          <p className="text-sm">{multibus[0].journeyDate}</p>
        </div>
        <div>
            <p className="text-sm">Reaches At</p>
            <p className="text-sm">{multibus[0].arrival}</p>
        </div>
        <div>
            <p className="text-sm">Hop At</p>
            <p className="text-sm">{multibus[0].to}</p>
        </div>
      </div>
    </div>
    <hr/>
    <div className="p-2">
    <h1 className="text-lg secondary-text">{multibus[1].name}</h1>
    <hr />
    <div className="d-flex justify-content-between">
      <div>
        <p className="text-sm">From</p>
        <p className="text-sm">{multibus[1].from}</p>
      </div>

      <div>
        <p className="text-sm">To</p>
        <p className="text-sm">{multibus[1].to}</p>
      </div>

      <div>
        <p className="text-sm">Fare</p>
        <p className="text-sm">₹ {multibus[1].fare} /-</p>
      </div>
    </div>
    <hr />
    <div className="d-flex justify-content-between align-items-end">
      <div>
        <p className="text-sm">Journey Date</p>
        <p className="text-sm">{multibus[1].journeyDate}</p>
      </div>
      <div>
            <p className="text-sm">Starts At</p>
            <p className="text-sm">{multibus[1].departure}</p>
        </div>

      <h1 className="text-lg underline primary-text" onClick={()=>{
        console.log("Params: ", multibus[1]._id);
          navigate(`/book-now/${multibus[0]._id}/${multibus[1]._id}`)
      }}>Book Now</h1>
    </div>
  </div>
  </div>
  )
}

export default MultiBus;