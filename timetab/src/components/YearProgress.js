import React, { useState } from 'react';
import '../css/YearProgress.css';

function YearProgress(props) {

  return (
    <div style={props.style} id="year-progress">
      <div className="title">2021 - 56%</div>
      <div className="year">
        <div className="month first">Jan</div>
        <div className="month">Jan</div>
        <div className="month">Jan</div>
        <div className="month">Jan</div>
        <div className="month">Jan</div>
        <div className="month">Jan</div>
        <div className="month">Jan</div>
        <div className="month">Jan</div>
        <div className="month">Jan</div>
        <div className="month">Jan</div>
        <div className="month">Jan</div>
        <div className="month last">Jan</div>
      </div>
      <div className="footer">
        <p>24 days until Summer</p>
      </div>

    </div>
  );
}


export default YearProgress
