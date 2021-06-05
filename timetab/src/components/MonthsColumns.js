import React, { useState } from 'react';
import '../css/MonthsColumns.css';
import { useTranslation, Trans } from 'react-i18next';
import Slider from '@material-ui/core/Slider';

function Day(props) {
  const { i18n } = useTranslation();

  const date = props.date;
  const weekday = date.getDay()
  const day = date.getDate()

  let classes = ["month-day"]

  const isWeekend = weekday === 0 || weekday === 6
  if (isWeekend) { classes.push("month-day--weekend") }

  const isPast = date < new Date().setHours(0,0,0,0)
  if (isPast) { classes.push("month-day--past") }

  let firstofnextmonth = new Date(date.getYear(), date.getMonth() + 1, 1)
  firstofnextmonth.setDate(firstofnextmonth.getDate() - 1);

  if (day === 1) { classes.push("month-day--first") }
  if (day === firstofnextmonth.getDate()) { classes.push("month-day--last") }

  const formatWeekDay = (weekday) => {
    return i18n.t("time.weekdays." + weekday.toString()).substr(0, 1)
  }

  return (
    <div className={classes.join(" ")}>
      <div className="month-day__wd">{formatWeekDay(weekday)}</div>
      <div className="month-day__wn">{day}</div>
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
      <div className="day-container">{month_days.map((day) => { return <Day date={day} /> })}</div>
    </div>
  )

}

function MonthsColumns(props) {

  const { i18n } = useTranslation();

  const [months, setMonths] = useState(4)

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
  console.log(monthsArray)

  return (
    <div style={props.style} id="months-columns">
      <div className="months-columns-title">
      <Slider
        defaultValue={4}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={3}
        max={12}
        onChange={(e, value) => {setMonths(value)}}
      />
      </div>
      <div className="months-container" style={{"gridTemplateColumns" : "repeat("+months+", auto)"}}>
        {monthsArray.map((m) => { return <Month month={m["month"]} year={m["year"]} /> })}
      </div>
      <div className="footer">
      </div>

    </div>
  );
}


export default MonthsColumns
