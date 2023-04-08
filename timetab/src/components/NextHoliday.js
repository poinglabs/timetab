import React from 'react';
import '../css/NextHoliday.css';
import { useTranslation } from 'react-i18next';

import { Trans } from 'react-i18next';

import _ from "lodash";




function NextHoliday(props) {

  const { i18n } = useTranslation();

  const handleClickHowTo = () => {
    props.openSettingsModal()
  }

  const events = JSON.parse(localStorage.getItem('events')) || [];

  // Use lodash filter method to create a new array that contains only those events where the imported field is not true
  const nextHoliday = _.find(_.orderBy(events, ['day']), event => new Date(event.day) > new Date() && event.holiday);
  const nextHolidayDays =  nextHoliday ? Math.ceil(Math.abs(new Date(nextHoliday.day) - new Date())/ (1000 * 60 * 60 * 24)) : "-"; 
  const days_text = nextHolidayDays === "-" ? "" : (nextHolidayDays > 1 ? <Trans i18nKey="next-holiday.days">days</Trans> :<Trans i18nKey="next-holiday.day">day</Trans>)
  
  let nextHolidayDateStr = ""
  if (nextHolidayDays !== "-") {
    const [year, month, day] = nextHoliday.day.split('-').map(Number);
    const wd = i18n.t("time.weekdays."+new Date(Date.UTC(year, month - 1, day)).getUTCDay().toString())
    const d = new Date(Date.UTC(year, month - 1, day)).getUTCDate()
    const m = i18n.t("time.months."+new Date(Date.UTC(year, month - 1, day)).getUTCMonth().toString())
    nextHolidayDateStr = `${wd} ${d}, ${m}`
  }
  const holiday_detail = nextHolidayDays === "-" ? <Trans i18nKey="next-holiday.howto">See <span className="howto" onClick={handleClickHowTo}>How to add holidays</span> in Settings</Trans> : `${nextHolidayDateStr} | ${nextHoliday.description}`

  return (
    <div style={props.style} id="next-holiday">
      <div className='next_holiday_box'>
        <h2><Trans i18nKey="next-holiday.title">Next holiday in</Trans></h2>

          <div className='next_holiday_box__days_number'>{nextHolidayDays}</div>
          <div className='next_holiday_box__days_text'>{days_text}</div>

        <div className='next_holiday_detail'>{holiday_detail}</div>
      </div>
    </div>
  );
}


export default NextHoliday
