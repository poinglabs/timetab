import React from 'react';
import '../css/YearProgress.css';
import { useTranslation } from 'react-i18next';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import EcoIcon from '@material-ui/icons/Eco';
import Brightness5 from '@material-ui/icons/Brightness5';

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

  function daysUntilNextSeason() {
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // Note: JavaScript months are zero-indexed
    let nextSeasonMonth;
    let nextSeasonNumber;
    
    // Determine which season we're currently in and when the next season starts
    if (currentMonth >= 3 && currentMonth <= 5) {
      // Spring - next season is summer
      nextSeasonMonth = 6;
      nextSeasonNumber = 2;
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      // Summer - next season is fall/autumn
      nextSeasonMonth = 9;
      nextSeasonNumber = 3;
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      // Fall/Autumn - next season is winter
      nextSeasonMonth = 12;
      nextSeasonNumber = 4;
    } else {
      // Winter - next season is spring
      nextSeasonMonth = 3;
      nextSeasonNumber = 1;
    }
    
    // Calculate the number of days until the next season change
    const nextSeasonYear = nextSeasonMonth > currentMonth ? now.getFullYear() : now.getFullYear() + 1;
    const nextSeasonDate = new Date(`${nextSeasonYear}-${nextSeasonMonth}-21`);
    const daysUntilNextSeason = Math.round((nextSeasonDate - now) / (1000 * 60 * 60 * 24));
    
    const output = {
      "daysUntilNextSeason": daysUntilNextSeason,
      "nextSeasonNumber": nextSeasonNumber
    }
    return output
  }
  

  let season_icons = [<Brightness5 />, <Brightness5 />, <Brightness5 />, <Brightness5 />]
  let seasons;
  let text = i18n.t("seasons.daystoDefault", { replace: { days: daysUntilNextSeason()["daysUntilNextSeason"] }})
  if (props.locationGeo["autodetect"]) {
    if (props.locationGeo["lat"] < 0) {
      season_icons = [<EcoIcon />, <AcUnitIcon />, <LocalFloristIcon />, <WbSunnyIcon />]
      seasons = [i18n.t("seasons.fall"), i18n.t("seasons.winter"), i18n.t("seasons.spring"), i18n.t("seasons.summer")]
    } else {
      season_icons =[<LocalFloristIcon />, <WbSunnyIcon />, <EcoIcon />, <AcUnitIcon />]
      seasons = [ i18n.t("seasons.spring"), i18n.t("seasons.summer"), i18n.t("seasons.fall"), i18n.t("seasons.winter")]
    }
    text = i18n.t("seasons.daysto", { replace: { days: daysUntilNextSeason()["daysUntilNextSeason"], nextSeason: seasons[daysUntilNextSeason()["nextSeasonNumber"]-1]}})
  }


  return (
    <div style={props.style} id="year-progress">
      <div className="year-container__pretitle">{year}</div>
     
      <div className="year-container">
        <div className="year-container_seasons-logos">
          <div className="year-container__seasons-logo seasons-logo-1">{season_icons[0]}</div>
          <div className="year-container__seasons-logo seasons-logo-2">{season_icons[1]}</div>
          <div className="year-container__seasons-logo seasons-logo-3">{season_icons[2]}</div>
          <div className="year-container__seasons-logo seasons-logo-4">{season_icons[3]}</div>
        </div>
        <div className="year-container__seasons-lines">
          <div className="year-container__seasons-line seasons-line-1"></div>
          <div className="year-container__seasons-line seasons-line-2"></div>
          <div className="year-container__seasons-line seasons-line-3"></div>
          <div className="year-container__seasons-line seasons-line-4"></div>
        </div>
        <div className="year-container__bar">
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
      </div>
       <div className="year-container__title">{progress}<span>%</span></div>
      <div className="year-container__footer">
        <p className='year-container__footer__days'>{text}</p>
      </div>

    </div>
  );
}


export default YearProgress
