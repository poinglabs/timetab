import React, { useState } from 'react';
import '../css/YearProgress.css';
import { useTranslation, Trans } from 'react-i18next';

function YearProgress(props) {

  const { i18n } = useTranslation();

  const now = new Date();
  const year = now.getFullYear();

  var start = new Date(year, 0, 0);
  var day = Math.floor((now - start) / (1000 * 60 * 60 * 24));

  const progress = Math.round(100*day/days_of_a_year(year))

  const formatMonth = (month) => {
    return i18n.t("time.months." + month.toString()).substr(0, 3)
  }

  function days_of_a_year(year) {

    return isLeapYear(year) ? 366 : 365;
  }

  function isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }

  return (
    <div style={props.style} id="year-progress">
      <div className="year-container__title">{year}</div>
      <div className="year-container">
        <div className="year-container__progress-bar" style={{width:progress+"%"}}></div>
        <div className="year-container__year">
          <div className="year-container__month year-container__month--first">{formatMonth(0)}</div>
          <div className="year-container__month">{formatMonth(1)}</div>
          <div className="year-container__month">{formatMonth(2)}</div>
          <div className="year-container__month">{formatMonth(3)}</div>
          <div className="year-container__month">{formatMonth(4)}</div>
          <div className="year-container__month">{formatMonth(5)}</div>
          <div className="year-container__month">{formatMonth(6)}</div>
          <div className="year-container__month">{formatMonth(7)}</div>
          <div className="year-container__month">{formatMonth(8)}</div>
          <div className="year-container__month">{formatMonth(9)}</div>
          <div className="year-container__month">{formatMonth(10)}</div>
          <div className="year-container__month year-container__month--last">{formatMonth(11)}</div>
        </div>
      </div>
      <div className="year-container__footer">
        <p>{progress}%</p>
      </div>

    </div>
  );
}


export default YearProgress
