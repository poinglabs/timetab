import React, { useState } from 'react';
import '../css/TenMinutesBlocks.css';



function Block(props) {
  let classes = "l-day-blocks__block"
  if (props.id * props.block_minutes < props.now_min) { classes = classes + " l-day-blocks__block--past" }
  return (
    <div className={classes}></div>
  )
}


function TenMinutesBlocks(props) {

  const block_minutes = 10
  const total_blocks = 24 * 60 / block_minutes
  const blocks = Array.from(Array(total_blocks).keys())
  console.log(blocks)

  const now = new Date();
  const now_min = now.getHours() * 60 + now.getMinutes();

  var wd = "getWeekDay(now)"
  var d = now.getDate()
  var m = "getMonth(now)"
  var y = now.getFullYear()

  return (
    <div style={props.style} id="ten-minutes-blocks" className="l-day-blocks">
      <div class='l-day-blocks__title'>{wd} {d} {m} in 10 minutes blocks</div>
      <div class='l-day-blocks__block-cont'>
        <div class='l-day-blocks__block-container'>
          {
            blocks.map((item, index) => {
              return <Block id={index + 1} key={index + 1} now_min={now_min} block_minutes={block_minutes}/>
            })
          }
        </div>
      </div>
    </div>
  );
}


export default TenMinutesBlocks
