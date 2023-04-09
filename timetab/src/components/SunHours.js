
import '../css/SunHours.css';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { useTranslation, Trans } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';


function SunHours(props) {

  const { i18n } = useTranslation();

  const times = props.times
  const moonIllumination = props.moonIllumination
  let moonParallacticAngle = props.moonParallacticAngle

  const [now, setDate] = useState(new Date());

  document.documentElement.style.setProperty("--moon-i", moonIllumination.fraction);

  if (moonIllumination.phase < 0.5) moonParallacticAngle = moonParallacticAngle+Math.PI

  let moonPhase;

  if (moonIllumination.phase <= 0.05) {
    moonPhase = i18n.t("moonPhases.newMoon", "New Moon")
  } else if (moonIllumination.phase > 0.05 && moonIllumination.phase <= 0.24) {  
    moonPhase = i18n.t("moonPhases.waxingCrescent", "Waxing Crescent")
  } else if (moonIllumination.phase > 0.24 && moonIllumination.phase <= 0.26) {
    moonPhase = i18n.t("moonPhases.firstQuarter", "First Quarter")
  } else if (moonIllumination.phase > 0.26 && moonIllumination.phase <= 0.45) {
    moonPhase = i18n.t("moonPhases.waxingGibbous", "Waxing Gibbous")
  } else if (moonIllumination.phase > 0.45 && moonIllumination.phase <= 0.55) {
    moonPhase = i18n.t("moonPhases.fullMoon", "Full Moon")
  } else if (moonIllumination.phase > 0.55 && moonIllumination.phase <= 0.7) {  
    moonPhase = i18n.t("moonPhases.waningGibbous", "Waning Gibbous")
  } else if (moonIllumination.phase > 0.7 && moonIllumination.phase <= 0.8) {
    moonPhase = i18n.t("moonPhases.lastQuarter", "Last Quarter")
  } else {
    moonPhase = i18n.t("moonPhases.waningCresent", "Waning Cresent")
  }   


  document.documentElement.style.setProperty("--moon-xf", Math.cos(moonParallacticAngle));
  document.documentElement.style.setProperty("--moon-yf", Math.sin(moonParallacticAngle));

  const sunriseHours = times.sunrise.getHours() + times.sunrise.getMinutes() / 60
  const sunsetHours = times.sunset.getHours() + times.sunset.getMinutes() / 60

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000*60);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  function tick() {
    setDate(new Date());
  }

  const getSunHourInfo = () => {
    let now_hs = now.getHours() + now.getMinutes() / 60
    if (now_hs > sunriseHours - 1 && now_hs < sunriseHours) {
      const minutes = parseInt((sunriseHours - now_hs)*60)
      return (<Trans i18nKey="sunhours.beforeSunrise" minutes={minutes}>
      Sunrise in <span className="sun-hours__info-minutes">{{minutes}}</span> minutes
      </Trans>)
    }
    if (now_hs > sunsetHours - 1 && now_hs < sunsetHours) {
      const minutes = parseInt((sunsetHours - now_hs)*60)
      return (<Trans i18nKey="sunhours.beforeSunset" minutes={minutes}>
      Sunset in <span className="sun-hours__info-minutes">{{minutes}}</span> minutes
      </Trans>)
    }
    return ""
  }

  return (
    <div className="c-sun-hours">
      <div className="sun-hours__hours">
        <div className="sun-hours__hours__hour" style={{ "left": (100 * sunriseHours / 24).toString() + "%" }}><WbSunnyIcon className="icon" style={{ fontSize: 24 }} /><Moment format="HH·mm" date={times.sunrise}></Moment></div>
        <div className="sun-hours__hours__hour" style={{ "left": (100 * sunsetHours / 24).toString() + "%" }}><Tooltip title={moonPhase} placement="top" arrow><i className="moon-icon icon"><span className="moon-icon__moon"></span></i></Tooltip><Moment format="HH·mm" date={times.sunset}></Moment></div>
      </div>
      <div className="sun-hours__container-lines">
        <div className="sun-hours__container-lines__lines" style={{ "left": (100 * sunriseHours / 24).toString() + "%", "width": (100 * (sunsetHours - sunriseHours) / 24).toString() + "%" }} ></div>
      </div>
      <div className="sun-hours__night-bar">
        <div className="sun-hours__night-bar__now-bar" style={{ "width": (100 * (now.getHours() + now.getMinutes() / 60) / 24).toString() + "%" }}><div className="sun-hours__night-bar__now-bar__fill"></div></div>
        <div className="sun-hours__night-bar__day-bar" style={{ "left": (100 * sunriseHours / 24).toString() + "%", "width": (100 * (sunsetHours - sunriseHours) / 24).toString() + "%" }}></div>
      </div>
      <div className="sun-hours__info">{getSunHourInfo()}</div>
    </div>
  );
}

export default SunHours

