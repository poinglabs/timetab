import React, { useState } from 'react';
import '../css/MonthsColumns.css';
import { useTranslation, Trans } from 'react-i18next';


function Month(props) {
  const { i18n } = useTranslation();
  const formatMonth = (month) => {
    return i18n.t("time.months." + month.toString()).substr(0, 3)
  }

  return (
    <div className="month-column">{formatMonth(props.month)} {props.year}</div>
  )

}



function MonthsColumns(props) {

  const { i18n } = useTranslation();

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();


  const getMonthsArray = (month, year) => {
    let months = []
    for (let i = 0; i < 12; i++) {
      let m = {}
      m["month"] = month + i > 11 ? month + i - 12 : month + i
      m["year"] = month + i > 11 ? year + 1 : year
      months.push(m)
    }
    return months
  }

  const monthsArray = getMonthsArray(month, year)
  console.log(monthsArray)

  return (
    <div style={props.style} id="months-columns">
      <div className="title"></div>
      <div className="months-container">
          {monthsArray.map((m) => { return <Month month={m["month"]} year={m["year"]} /> })}
      </div>
      <div className="footer">
      </div>

    </div>
  );
}


export default MonthsColumns
