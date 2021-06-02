import React, { useState } from 'react';
import '../css/TenMinutesBlocks.css';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStay from '@material-ui/icons/NightsStay';
import { useTranslation, Trans } from 'react-i18next';

function Block(props) {
  let classes = ["l-day-blocks__block"]
  if (props.id * props.block_minutes < props.now_min) { classes.push("past") }
  if (props.id < props.sunrise_index || props.id > props.sunset_index) { classes.push("night") }
  const getIcon = () => {
    if (props.id == props.sunrise_index) {
        return <WbSunnyIcon className="icon" style={{ fontSize: 24 }} />
    } else if (props.id == props.sunset_index) {
      return <NightsStay className="icon" style={{ fontSize: 24 }} />
    } else {
      return ""
    }
  }
  const getHour = () => {
    if ((props.id -1) % 12 == 0) {
    return <div className="hour hour-left">{2*(props.id -1) / 12}</div>
    } else if ((props.id +12) % 12 == 0) {
      return <div className="hour hour-right">{(2*(props.id +12) / 12)-2}</div>
    } else {
      return ""
    }
  }
  
  return (
    <div className={classes.join(" ")}>{getHour()}</div>
  )
}


function TenMinutesBlocks(props) {

  const { i18n } = useTranslation();

  const block_minutes = 10
  const total_blocks = 24 * 60 / block_minutes
  const blocks = Array.from(Array(total_blocks).keys())
  console.log(blocks)

  const times = props.times
  const sunriseHoursIndex = Math.floor((times.sunrise.getHours() * 60 + times.sunrise.getMinutes()) / 10) + 1
  const sunsetHoursIndex = Math.floor((times.sunset.getHours() * 60 + times.sunset.getMinutes()) / 10) + 1

  const now = new Date();
  const now_min = now.getHours() * 60 + now.getMinutes();

  var wd = i18n.t("time.weekdays."+now.getDay().toString())
  var d = now.getDate()
  var m = i18n.t("time.months."+now.getMonth().toString())
  var y = now.getFullYear()

  return (
    <div style={props.style} id="ten-minutes-blocks" className="l-day-blocks">
      <div class='l-day-blocks__title'>{wd} {d} {m}</div>
      <div class='l-day-blocks__subtitle'><Trans i18nKey="inTenMinBlock">in 10 minutes blocks</Trans></div>
      <div class='l-day-blocks__block-cont'>
        <div class='l-day-blocks__block-container'>
          {
            blocks.map((item, index) => {
              return <Block id={index + 1} key={index + 1} now_min={now_min} locationOn={props.locationOn} block_minutes={block_minutes} sunrise_index={sunriseHoursIndex} sunset_index={sunsetHoursIndex} />
            })
          }
        </div>
      </div>
      <div class='l-day-blocks__footer'><a target="_blank" href="https://waitbutwhy.com/2016/10/100-blocks-day.html"><Trans i18nKey="blocksQuestion">How is this useful?</Trans></a></div>

    </div>
  );
}


export default TenMinutesBlocks
