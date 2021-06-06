import React, { useState } from 'react';
import '../css/LifeCalendar.css';
import { useTranslation, Trans } from 'react-i18next';

import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterMoment';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';

import Button from '@material-ui/core/Button';

import store from 'store'

function Block(props) {
  let classes = ["l-life-blocks__block"]

  if (props.id < props.now_week) { classes.push("l-life-blocks__block--past") }

  const getAge = () => {
    if ((props.id -1) % 104 == 0) {
    return <div className="l-life-blocks__block__hour l-life-blocks__block__hour--left">{(props.id -1) / 52}</div>
    } else if ((props.id +104) % 104 == 0) {
      return <div className="l-life-blocks__block__hour l-life-blocks__block__hour--right">{((props.id +52) / 52)-1}</div>
    } else {
      return ""
    }
  }


  return (
  <div className={classes.join(" ")}>{getAge()}</div>
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
      <div className='l-life-blocks__title'><Trans i18nKey="lifeInWeeks">Your life in weeks</Trans></div>
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

      <React.Fragment>
        <div class='l-life-blocks__subtitle'><Trans i18nKey="enterBirthday">To view your life calendar, enter your date of birth</Trans></div>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="year"
            value={new Date(1990, 1, 6)}
            onChange={(newValue) => {
              setBirthdayPicker(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div style={{"textAlign" : "center"}}><Button variant="contained" style={{"marginTop" : "8px"}} onClick={() => { saveBirthday(birthdayPicker) }}><Trans i18nKey="show">Show</Trans></Button></div>
        
        </React.Fragment>
    )
  }


  return (
    <div style={props.style} id="l-life-blocks" className="l-life-blocks">
      {birthday ? <Calendar birthday={birthday}/> : renderPicker()}
      <div class='l-life-blocks__footer'><a target="_blank" href="https://waitbutwhy.com/2014/05/life-weeks.html"><Trans i18nKey="blocksQuestion">How is this useful?</Trans></a></div>
    </div>
  );
}


export default LifeCalendar
