
import '../css/Settings.css';
//import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
//import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Switch from '@material-ui/core/Switch';
//import {useTranslation, Trans } from 'react-i18next';

import axios from 'axios';

import { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Button } from '@material-ui/core';

import { Trans } from 'react-i18next';
import store from 'store'
import _ from "lodash";

import flag_ar from '../img/flags/AR.svg';
import flag_us from '../img/flags/US.svg';
import flag_de from '../img/flags/DE.svg';

function Settings(props) {

  /*
  const { t } = useTranslation();
  const [locationAutodetect, setLocationAutodetect] = useState(props.location.autodetect);

  const handleLocAutodetectChange = (event) => {
    //console.log(event.target.checked)
    props.changeLocation("location.autodetect", event.target.checked)
    setLocationAutodetect(event.target.checked);
  };
  */
  const useStylesChips = makeStyles({
    root: {
      marginRight: "16px",
      fontFamily: "var(--font-secondary)"
    },
  });

  const useStylesChipsActive = makeStyles({
    root: {
      marginRight: "16px",
      fontFamily: "var(--font-secondary)",
      borderColor: "black",
      fontWeight: "600"
    },
  });

  const classesChips = useStylesChips()
  const classesChipsActive = useStylesChipsActive()

  const useStylesThemes = makeStyles({
    root: {
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      marginRight: "16px",
      display: "inline-block",
      width: "100px",
      height: "86px",
      margin: "4px",
      cursor: "pointer",
      overflow: "hidden",
      padding: 0,
      fontFamily: "var(--font-secondary)"
    },
  });

  const useStylesThemesActive = makeStyles({
    root: {
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      marginRight: "16px",
      display: "inline-block",
      width: "100px",
      height: "86px",
      padding: 0,
      margin: "4px",
      cursor: "pointer",
      overflow: "hidden",
      borderColor: "black",
      fontWeight: "bold",
      fontFamily: "var(--font-secondary)"
    },
  });

  const classesThemes = useStylesThemes();
  const classesThemesActive = useStylesThemesActive();

  /*const useStylesForms = makeStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      marginRight: "16px",
      width: "120px",
      fontFamily: "var(--font-secondary)"
    },
  });

  const classesForm = useStylesForms();
  */
  const activeLang = store.get("i18nextLng")
  const activeTheme = store.get("theme")

  const [selectedCountryCode, setSelectedCountryCode] = useState('defaultCountryCode');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [countryList, setCountryList] = useState([]);

  const fetchCountryList = async () => {

    Promise.all([fetch('./data/countries.json')])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => {setCountryList(data1.countries)})

    /*
    try {
      const response = await fetch('https://us-central1-poing-timetab.cloudfunctions.net/holidays_get_countries');
      const data = await response.json();
      setCountryList(data.countries);
    } catch (error) {
      console.error(error);
    }
    */
  };

  useEffect(() => {
    fetchCountryList();
  }, []);

  const [output, setOutput] = useState('');

  const handleImportHolidays = async () => {
    try {
      if (selectedCountryCode != "defaultCountryCode") {
      
      
        setOutput('Importing...');
        const response = await axios.get(`https://us-central1-poing-timetab.cloudfunctions.net/holidays_get_holidays?countryCode=${selectedCountryCode}&year=${selectedYear}`);
        const newEvents = response.data["holidays"];
        const existingEvents = JSON.parse(localStorage.getItem('events') || "[]");
        const newEventsNumber = newEvents.length
        const existingEventsNumber =existingEvents.length


        if (newEventsNumber+existingEventsNumber < 100) {
          
          const updatedEvents = _.concat(existingEvents, newEvents);
          localStorage.setItem('events', JSON.stringify(updatedEvents));
          setOutput(`Success. ${newEventsNumber} holidays imported`);

        } else {
          setOutput(`Error. Too many events`);
        }
      } else {
        setOutput(`Error. Please select a country`);
      }
    } catch (error) {
      console.error(error);
      setOutput('Error fetching data');
    }
  };

  const handleDeleteHolidays = () => {
    // Retrieve the existing array from localStorage
    const events = JSON.parse(localStorage.getItem('events'));

    // Use lodash filter method to create a new array that contains only those events where the imported field is not true
    const filteredEvents = _.filter(events, (event) => {
      return event.imported !== true;
    });

    // Stringify and store the new array back in localStorage
    localStorage.setItem('events', JSON.stringify(filteredEvents));
    setOutput(`Success. Imported events deleted.`);
  };

  function renderTheme(item) {
    let t_style;
    const elevation = activeTheme === item.name ? 7 : 1;
    if (item.thumbnail !== "") {
      const myThemeBackgroundImg = _.find(props.backgroundImages, ['id', item.thumbnail])
      t_style = { "backgroundImage": `url('${myThemeBackgroundImg.base64}')` };
    } else if (item["palette"].length) {
      t_style = { "background": `linear-gradient(90deg, ${item["palette"][0]} 0%, ${item["palette"][0]} 33%, ${item["palette"][1]} 33%, ${item["palette"][1]} 66%, ${item["palette"][2]} 66%, ${item["palette"][2]} 100%)` }
    }

    return (
      <Paper className={activeTheme === item.name ? classesThemesActive.root : classesThemes.root} key={item.name} elevation={elevation} onClick={() => props.changeTheme(item.name)}>
        <h3><Trans i18nKey={"themes." + item.name}>{item.name}</Trans></h3>
        <div className="theme-box--img" style={t_style}></div>
      </Paper>)
  }

  return (
    <div className="">
      <Grid container direction="row">
        <Grid item xs={6}></Grid>
        <Grid item xs={6} className="btn-close" style={{ textAlign: "right" }}><CloseIcon onClick={() => props.closeSettings()} style={{ fontSize: 24 }} className="" /></Grid>
      </Grid>
      <section>
        <h2>
          <Trans i18nKey="settings.language">Language</Trans>
        </h2>
        <div >
          <Chip className={activeLang.startsWith("en") ? classesChipsActive.root : classesChips.root} label="English" variant="outlined" avatar={<Avatar src={flag_us} />} onClick={() => props.changeLanguagee("en")} />
          <Chip className={activeLang.startsWith("es") ? classesChipsActive.root : classesChips.root} label="Español" variant="outlined" avatar={<Avatar src={flag_ar} />} onClick={() => props.changeLanguagee("es")} />
          <Chip className={activeLang.startsWith("de") ? classesChipsActive.root : classesChips.root} label="Deutsch" variant="outlined" avatar={<Avatar src={flag_de} />} onClick={() => props.changeLanguagee("de")} />
        </div>
      </section>

      {/*
      <section>
        <h2>
          <Trans i18nKey="settings.location">Location</Trans>
        </h2>
        <div style={{display: "flex"}}>
          <TextField className={classesForm.root} disabled={locationAutodetect} id="outlined-basic" label={t("settings.latitude")} variant="outlined" type="number" onBlur={(e) => { props.changeLocation("location.lat", e.target.value) }} defaultValue={props.location.lat} />
          <TextField className={classesForm.root} disabled={locationAutodetect} id="outlined-basic" label={t("settings.longitude")} variant="outlined" type="number" onBlur={(e) => { props.changeLocation("location.lng", e.target.value) }} defaultValue={props.location.lng} />
          <FormControlLabel
            disabled={props.location.error != null}
            control={
              <Switch
                checked={locationAutodetect}
                onChange={handleLocAutodetectChange}
                name="locationAutodetect"
                color="primary"
              />
            }
            label={t("settings.autodetect")}
          /> {props.location.error && <div className="please-share" ><Trans i18nKey="settings.pleaseShareLocation">Please share your <a target="_blank" rel="noreferrer" href="https://support.google.com/chrome/answer/142065">location</a></Trans></div>}

        </div>
          </section>*/}
      <section>
        <h2>
          <Trans i18nKey="settings.theme">Theme</Trans>
        </h2>
        <div>
          {props.themes.map(renderTheme)}
        </div>
      </section>
      <section>
        <h2>
          <Trans i18nKey="settings.holidays">Holidays</Trans>
        </h2>
        <div className="please-share" style={{ marginBottom: "20px" }}>Import the holidays of a country, they will be display in the Month Columns and Next Holiday view. You can also mark additional holidays in MonthsColumns view.</div>
        <div>
        <FormControl >
          <Select
            style={{ height: "40px", marginRight : "20px" }}
            value={selectedCountryCode || 'AR'}
            onChange={(event) => setSelectedCountryCode(event.target.value)}
          >
            <MenuItem key="default" value="defaultCountryCode" disabled>Select a country</MenuItem>
            {countryList.map((country) => (
              <MenuItem key={country.countryCode} value={country.countryCode}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl >
          <Select
            style={{ height: "40px", marginRight : "20px" }}
            value={selectedYear || new Date().getFullYear()}
            onChange={(event) => setSelectedYear(event.target.value)}
          >
              <MenuItem key={new Date().getFullYear()} value={new Date().getFullYear()}>
              {new Date().getFullYear().toString()}
              </MenuItem>
              <MenuItem key={new Date().getFullYear()+1} value={new Date().getFullYear()+1}>
              {(new Date().getFullYear()+1).toString()}
              </MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleImportHolidays} style={{ height: "40px", marginRight : "20px" }} variant="contained" color="primary">Import</Button>
        <Button onClick={handleDeleteHolidays} style={{ height: "40px" }}>Delete holidays</Button>
        </div>
        <div className="please-share" style={{ marginBottom: "15px", marginTop: "15px" }}>{output}</div>
      </section>
      <section>

        {!props.location.autodetect &&
          <div className="please-share" >
            <Trans i18nKey="settings.pleaseShareLocation">Please enable location settings in your <a target="_blank" rel="noreferrer" href="https://support.google.com/chrome/answer/142065">browser</a> and OS to get the full theme experience</Trans>
        </div>}

      </section>
      <div>
      </div>
    </div>
  );
}

export default Settings

