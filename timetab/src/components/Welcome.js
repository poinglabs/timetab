import React, { useState } from 'react';
import '../css/Welcome.css';
import Clock from './Clock';
import SunHours from './SunHours';
import { logEvent } from './analytics';
import useWindowDimensions from './useWindowDimensions';


function Welcome(props) {

  const [timerTime, setTimerTime] = useState(null);

  const { height, width } = useWindowDimensions();

  let clockDragStart = false;
  let clockNearStart = false;

  let clockDragStartCoords = { x: null, y: null };

  const centerCoords = { x: width / 2, y: height / 2 };
  const topCoords = { x: width / 2, y: 0 };

  let activeBubble = null

  const createTimerBubbles = () => {
    
    const minutes = [5, 15, 25, 45, 60]

    const distance = 0.4 * height

    let bubbles = []

    for (let index = 0; index < minutes.length; index++) {
      const min = minutes[index]
      const angle = min * Math.PI / 120 - Math.PI / 2

      const xx = width / 2 + distance * Math.cos(angle) - 30;
      const yy = height / 2 + distance * Math.sin(angle) - 30;

      bubbles.push(<div key={min} style={{ top: yy, left: xx }} onMouseLeave={(e) => mouseBubbleLeave(min)} onMouseEnter={(e) => mouseBubbleEnter(min)} className="timer-bubble">{min}<br /><span>min</span></div>)
    }
    return bubbles
    
  }

  const mouseBubbleEnter = (min) => {
    //console.log("enter")
    let cursorTooltip = document.getElementById("timer-tooltip")
    cursorTooltip.style.display = "none";
    activeBubble = min
  }

  const mouseBubbleLeave = () => {
    //console.log("leave")
    let cursorTooltip = document.getElementById("timer-tooltip")
    if (clockDragStart) {
      cursorTooltip.style.display = "flex";
    }
    activeBubble = null
  }

  const mouseUp = (e) => {
    //console.log("mouse up " + clockDragStart + " " + clockNearStart)
    if (clockDragStart && clockNearStart) {
      let minutes;
      if (activeBubble) {
        minutes = activeBubble
      } else {
        const endX = e.clientX
        const endY = e.clientY
        const endCoords = { x: endX, y: endY }
        minutes = getTimeFromMouse(endCoords).minutes
      }

      setTimerTime(minutes * 60)
      document.getElementById('timer-on').play();

      logEvent("ui_interaction", {
        "section": "clock",
        "subsection": "timer",
        "action": "add",
        "element": "timer",
        "value": minutes
      })
    }

    clockDragStart = false
    document.getElementById("timer-tooltip").style.display = "none";
    document.getElementById("welcome").classList.remove("welcome--add-timer-cursor");
    document.getElementById("clock").classList.remove("welcome--clock-light");
    document.querySelectorAll('.timer-bubble').forEach(div => { div.style.display = "none"; });

  }

  const mouseDownClock = (e) => {
    clockDragStart = true
    clockDragStartCoords = { x: e.clientX, y: e.clientY }
  }

  const mouseMove = (e) => {
    if (clockDragStart) {
      const moveX = e.clientX
      const moveY = e.clientY
      const moveCoords = { x: moveX, y: moveY }
      var a = clockDragStartCoords.x - moveX;
      var b = clockDragStartCoords.y - moveY;
      var distance = Math.sqrt(a * a + b * b);

      let cursorTooltip = document.getElementById("timer-tooltip")
      if (!clockNearStart && distance > 40) {
        cursorTooltip.style.display = "flex";
        document.getElementById("welcome").classList.add("welcome--add-timer-cursor");
        document.getElementById("clock").classList.add("welcome--clock-light");
        clockNearStart = true

        document.querySelectorAll('.timer-bubble').forEach(div => { div.style.display = "flex"; div.classList.add("show") });

      }
      if (clockNearStart) {
        cursorTooltip.style.left = (e.clientX + 30) + 'px';
        cursorTooltip.style.top = e.clientY + 'px';
        cursorTooltip.innerText = getTimeFromMouse(moveCoords).strTime
      }
    }
  }

  const getAngleBetweenLines = (line1p1, line1p2, line2p1, line2p2) => {
    const dAx = line1p2.x - line1p1.x;
    const dAy = line1p2.y - line1p1.y;
    const dBx = line2p2.x - line2p1.x;
    const dBy = line2p2.y - line2p1.y;
    let angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
    if (angle < 0) { angle = angle * -1; }
    return angle;// * (180 / Math.PI);
  }

  const getTimeFromMouse = (coords) => {
    let angle = getAngleBetweenLines(centerCoords, topCoords, centerCoords, coords)
    const minutes = parseInt(angle * 120 / Math.PI)
    const hs = Math.floor(minutes / 60)
    const min = minutes - hs * 60
    return {
      minutes: minutes,
      strTime: hs + "·" + min
    }
  }

  return (
    <div id="welcome" style={props.style} onMouseUp={(e) => mouseUp(e)} onMouseMove={(e) => mouseMove(e)}>
      <div id="timer-tooltip"></div>

      {createTimerBubbles()}

      <audio id="timer-on" preload="auto"><source src="/sounds/click-tone.wav" type="audio/wav" /></audio>
      <Clock onMouseDown={mouseDownClock} timerTime={timerTime} />
      {props.locationOn ? <SunHours times={props.times} moonIllumination={props.moonIllumination} moonParallacticAngle={props.moonParallacticAngle} /> : null}

    </div>
  );
}


export default Welcome
