import React, { useState } from 'react';
import '../css/LifeCalendar.css';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStay from '@material-ui/icons/NightsStay';
import { useTranslation, Trans } from 'react-i18next';

import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterMoment';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';

import Button from '@material-ui/core/Button';

import store from 'store'

function Block(props) {
  let classes = ["l-life-blocks__block"]

  if (props.id < props.now_week) { classes.push("past") }

  return (
    <div className={classes.join(" ")}></div>
  )
}


function Calendar(props) {
  const { i18n } = useTranslation();

  const total_blocks = 52*90
  const blocks = Array.from(Array(total_blocks).keys())

  const now = new Date();
  const diffDays = Math.ceil((now - Date.parse(props.birthday))/ (1000 * 60 * 60 * 24))
  const currentWeek = Math.floor(diffDays/7)
  

  return (
    <React.Fragment>
      <div className='l-life-blocks__title'>Your 90 year life in weeks</div>
      <div className='l-life-blocks__subtitle'><Trans i18nKey="inTenMinBlock">...</Trans></div>
      <div className='l-life-blocks__block-cont'>
        <div className='l-life-blocks__block-container'>
          {
            blocks.map((item, index) => {
              return <Block id={index + 1} key={index + 1} birthday={props.birthday} now_week={currentWeek}/>
            })
          }
        </div>
      </div>
      </React.Fragment>
  )
}



function LifeCalendar(props) {

  const [birthday, setBirthday] = useState(store.get('birthday'))
  const [birthdayPicker, setBirthdayPicker] = useState(new Date(1990, 1, 6))

  const saveBirthday = (newvalue) => {
    store.set('birthday', newvalue.toISOString())
    setBirthday(newvalue)
  }

  const renderPicker = () => {
    return (

      <div>
        <div class='l-life-blocks__title'>Please enter you birthday:</div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={new Date(1990, 1, 6)}
            onChange={(newValue) => {
              setBirthdayPicker(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button variant="contained" onClick={() => { saveBirthday(birthdayPicker) }}>Show</Button>
      </div>
    )
  }


  return (
    <div style={props.style} id="l-life-blocks" className="l-life-blocks">
      {birthday ? <Calendar birthday={birthday}/> : renderPicker()}
      <div class='l-life-blocks__footer'><a target="_blank" href="https://waitbutwhy.com/2016/10/100-blocks-day.html"><Trans i18nKey="blocksQuestion">How is this useful?</Trans></a></div>

    </div>
  );
}


export default LifeCalendar
