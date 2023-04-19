import React, { useState, useEffect, useRef } from 'react';
import '../css/MonthsColumns.css';
import { useTranslation, Trans } from 'react-i18next';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import store from 'store'
import Tooltip from '@material-ui/core/Tooltip';

import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

import Modal from 'react-modal';

import _ from "lodash";

const useStyles = makeStyles({
  root: {
    color: "var(--color-on-background) !important",
  }
});


function Day(props) {
  const { i18n } = useTranslation();
  const forceUpdate = React.useReducer(() => ({}))[1]

  const getEventsForDate = (isoDate) => {
    if (store.get('events')) {
      const events = store.get('events')
      return  _.filter(events, function(o) { return o.day === isoDate});
    } else {
      return []
    }
  }

  const formatWeekDay = (weekday) => {
    return i18n.t("time.weekdays." + weekday.toString()).substr(0, 1)
  }

  const date = props.date;
  const isoDate = moment(date).format('YYYY-MM-DD')
  const weekday = date.getDay()
  const day = date.getDate()


  let classes = ["month-day"]

  const isWeekend = weekday === 0 || weekday === 6
  if (isWeekend) { classes.push("month-day--weekend")}

  let dateEvents = getEventsForDate(isoDate)
  if (!isWeekend && _.find(dateEvents, 'holiday')) {classes.push("month-day--weekend")};
  
  const isPast = date < new Date().setHours(0,0,0,0)
  if (isPast) { classes.push("month-day--past") }

  let firstofnextmonth = new Date(date.getYear(), date.getMonth() + 1, 1)
  firstofnextmonth.setDate(firstofnextmonth.getDate() - 1);

  if (day === 1) { classes.push("month-day--first") }
  if (day === firstofnextmonth.getDate()) { classes.push("month-day--last") }

  const handleDeleteEvent = (description) => {
    console.log(description)
    const existingEvents = JSON.parse(localStorage.getItem('events'));
    const filteredEvents = _.filter(existingEvents, (event) => {
      const isSameDay = event.day === isoDate
      const isDescription = event.description === description
      return !isSameDay || !isDescription;
    });
    console.log(filteredEvents)
    // Stringify and store the new array back in localStorage
    localStorage.setItem('events', JSON.stringify(filteredEvents));
    forceUpdate()

  }

  const handleToggleHoliday = () => {

    const isHoliday = dateEvents.some(event => event.holiday);
    const existingEvents = JSON.parse(localStorage.getItem('events')) || [];

    if (!isWeekend && !isHoliday) {
      // not holiday, add holiday
      const newEvents = [{"day":isoDate, "description":"Free day", "holiday":true}]
      const updatedEvents = _.concat(existingEvents, newEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    }
    
    forceUpdate()
  };

  return (
    <div className={classes.join(" ")}>
      <div className="month-day__wd" onClick={handleToggleHoliday}>{formatWeekDay(weekday)}</div>
      <div className="month-day__wn" onClick={() => {props.openNewEventModal(isoDate)}}>{day}</div>
      <div className="month-day__event">{
      dateEvents.map((ev) => { 
        if (ev.holiday) {
          return <Tooltip title={ev.description} classes={{ tooltip: classes.tooltip }}>
                  <span className="month-day__event_item" onClick={() => handleDeleteEvent(ev.description)}>•</span>
                  </Tooltip>
        } else {
          return <span className="month-day__event_item" onClick={() => handleDeleteEvent(ev.description)}>{ev.description}</span>   
        }
      })
    }</div>
    </div>
  )

}

function Month(props) {
  const { i18n } = useTranslation();
  const formatMonth = (month) => {
    return i18n.t("time.months." + month.toString()).substr(0, 3)
  }
  const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
  const month_days = getDaysInMonth(props.month, props.year)
  const year = props.year.toString()

  return (
    <div className="month-column">
      <div className="month-title">{formatMonth(props.month)} {year.substr(2, 2)}</div>
      <div className="day-container">{month_days.map((day) => { return <Day date={day} key={day} openNewEventModal={props.openNewEventModal}/> })}</div>
    </div>
  )

}

function TextInput() {
  const inputRef = useRef(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return <TextField id="new-event-text" inputRef={inputRef} label={i18n.t("newevent.eventDescription")} variant="outlined" style={{width : "250px", margin: "auto 15px"}}/>;
}

function MonthsColumns(props) {

  const { i18n } = useTranslation();

  const [months, setMonths] = useState(4)
  const [newEventIsOpen, setNewEventIsOpen] = useState(false)
  const [newEventDate, setNewEventDate] = useState("")

  var wd = i18n.t("time.weekdays."+new Date(newEventDate).getUTCDay().toString())
  var d = new Date(newEventDate).getUTCDate()
  var m = i18n.t("time.months."+new Date(newEventDate).getUTCMonth().toString())


  const openNewEventModal = (date) => {
    setNewEventDate(date)
    setNewEventIsOpen(true)
  }

  const saveNewEvent = (date) => {
    
    const input = document.getElementById("new-event-text").value

    if (input !== "") {
      const existingEvents = JSON.parse(localStorage.getItem('events')) || [];
      const newEvents = [{
        "day" : date,
        "description" : input
      }]
      
      const updatedEvents = _.concat(existingEvents, newEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setNewEventIsOpen(false)
    }
  }

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const getMonthsArray = (month, year) => {
    let monthsArray = []
    for (let i = 0; i < months; i++) {
      let m = {}
      m["month"] = month + i > 11 ? month + i - 12 : month + i
      m["year"] = month + i > 11 ? year + 1 : year
      monthsArray.push(m)
    }
    return monthsArray
  }

  const monthsArray = getMonthsArray(month, year)

  const classes = useStyles();

  const modalCustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      minWidth: '800px',
      maxHeight: "90%"
    },
    overlay: {
      backgroundColor: '#00000094'
    }
  };

  const submitNewEvent =  (e, date) => {
    if (e.keyCode === 13 && newEventIsOpen) {
      saveNewEvent(date)
    }
  }

  return (
    <div style={props.style} id="months-columns" onKeyDown={(e) => { submitNewEvent(e, newEventDate) }} >
      <div className="months-columns-title">
      <Slider
        defaultValue={4}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="off"
        step={1}
        classes={{
          root: classes.root
        }}
        min={3}
        max={12}
        onChange={(e, value) => {setMonths(value)}}
      />
      </div>
      <div className="months-container" style={{"gridTemplateColumns" : "repeat("+months+", 1fr)"}}>
        {monthsArray.map((m) => { return <Month month={m["month"]} year={m["year"]} key={m["month"].toString()+m["year"].toString()} openNewEventModal={openNewEventModal}/> })}
      </div>
      <div className="footer">
      </div>
      <Modal
        isOpen={newEventIsOpen}
        closeTimeoutMS={300}
        style={modalCustomStyles}
        contentLabel="Example Modal"
      ><div className="newevent-container"><div className="newevent-text">{wd} {d}, {m}</div> <TextInput /> <Button variant="contained" color="primary" style={{ height: "40px" }} onClick={() => saveNewEvent(newEventDate)}><Trans i18nKey="newevent.save">Save</Trans></Button><Button style={{ height: "40px" }} onClick={() => setNewEventIsOpen(false)}><CloseIcon style={{ fontSize: 24 }} /><Trans i18nKey="newevent.close">Close</Trans></Button></div></Modal>
    </div>
  );
}


export default MonthsColumns
