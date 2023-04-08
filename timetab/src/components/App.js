import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { useTransition, animated } from 'react-spring'
import '../css/App.css';

import Welcome from './Welcome';
import TenMinutesBlocks from './TenMinutesBlocks';
import YearProgress from './YearProgress';
import MonthsColumns from './MonthsColumns';
import LifeCalendar from './LifeCalendar';

import Settings from './Settings';
import { useTranslation, Trans } from 'react-i18next';

import Modal from 'react-modal';

import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import _ from "lodash";
import SunCalc from 'suncalc'
import store from 'store'

import { logEvent } from './analytics';

// https://www.npmjs.com/package/suncalc

function Footer(props) {
  return (
    <footer>
      {props.switchMessage === "true" ? <div className="container-space-bar"><Trans i18nKey="pressSpace">Press <span className="container-space-bar__space-bar blink">Space</span> for next view</Trans></div> : ""}
      <Grid container direction="row">
        <Grid className="photoby" item xs={6} >
          {props.photoAuthor ? (<React.Fragment><Trans i18nKey="photoBy">Photo by</Trans>&nbsp;<a href={props.photoUrl} rel="noreferrer" target="_blank">{props.photoAuthor}</a></React.Fragment>) : null}
        </Grid>
        <Grid item xs={6} className="settings-button" style={{ textAlign: "right" }}><SettingsIcon onClick={() => props.openSettings()} style={{ fontSize: 24 }} className="settings-button__btn" /></Grid>
      </Grid>
    </footer>
  )
}

function App() {

  // states
  
  const [themes, setThemes] = useState(null)
  const [themeProperties, setThemeProperties] = useState(null)
  const [themeImages, setThemeImages] = useState(null)

  const [theme, setTheme] = useState(null)

  const defaultLocation = store.get('location') || { "lat": 0, "lng": 0, "autodetect": true, "error": null }
  const [locationGeo, setLocationGeo] = useState(defaultLocation)

  const [switchMessage, setSwitchMessage] = useState(store.get('switchMessage') || "true")

  const [photoAutor, setphotoAutor] = useState(null)
  const [photoUrl, setphotoUrl] = useState(null)

  const [sunCalcTimes, setSunCalcTimes] = useState(SunCalc.getTimes(new Date(), locationGeo.lat, locationGeo.lng))

  const [settingsIsOpen, setSettingsOpen] = useState(false)

  // variables

  const { i18n } = useTranslation();
  let moonIllumination = SunCalc.getMoonIllumination(new Date());
  let moonParallacticAngle = SunCalc.getMoonPosition(new Date(), locationGeo.lat, locationGeo.lng).parallacticAngle

  const modalCustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      minWidth: '700px',
      maxHeight: "90%"
    },
    overlay: {
      backgroundColor: '#00000094'
    }
  };

  const location = useLocation();
  let history = useHistory();
  

  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translate3d(0,-10%,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0%,0)" },
    leave: { opacity: 0, transform: "translate3d(0,10%,0)" },
    config: { tension: 80, friction: 12 }
  });

  //functions

  const views = ["/", "/ten-minutes-blocks", "/year-progress", "/months-columns", "life-calendar"]
  const views_blur = [false, true, true, true, true]
  const view_weights = [0,0,0,0,1,1,2,2,3,3]

  const blurView = (view_index) => {
    if (views_blur[view_index]) {
      document.body.classList.add("blur")
    } else {
      document.body.classList.remove("blur")
    }
  }

  const pushRandomView = () => {
    let random_index = Math.floor(Math.random() * (9 - 0 + 1) + 0)
    let push_index = view_weights[random_index]
    blurView(push_index)
    history.push(views[push_index])
  }

  const switchView = (e) => {
    if (e.keyCode === 32) {

      let index = views.indexOf(location.pathname)
      let new_index = index === views.length - 1 ? 0 : index + 1
      blurView(new_index)
      if (new_index === views.length - 1) {
        store.set('switchMessage', "false")
        setSwitchMessage(false)
      }

      history.push(views[new_index]);
    }
  }

  const openSettingsModal = () => {
    logEvent("ui_interaction", {
      "section": "settings",
      "subction": undefined,
      "action": "open",
      "element": undefined,
      "value": undefined
    })
    setSettingsOpen(true);
  }
  const closeSettingsModal = () => {
    logEvent("ui_interaction", {
      "section": "settings",
      "subction": undefined,
      "action": "close",
      "element": undefined,
      "value": undefined
    })
    setSettingsOpen(false);
  }

  const initTheme = (newTheme) => {
    setTheme(newTheme);
    store.set('theme', newTheme)
  }

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    store.set('theme', newTheme)
    logEvent("ui_interaction", {
      "section": "settings",
      "subction": undefined,
      "action": "change theme",
      "element": newTheme,
      "value": undefined
    })
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    logEvent("ui_interaction", {
      "section": "settings",
      "subction": undefined,
      "action": "change language",
      "element": lng,
      "value": undefined
    })
  };

  const changeLocation = (key, value) => {
    let keys = key.split(".")
    let loc = store.get("location")
    loc[keys[1]] = (typeof value) == "string" ? parseFloat(value) : value
    store.set("location", loc)
    setLocationGeo(store.get('location'))
    setSunCalcTimes(SunCalc.getTimes(new Date(), locationGeo.lat, locationGeo.lng))
  };

  // init
  store.set('location', locationGeo)
  Modal.setAppElement('#app')


  useEffect(() => {
    pushRandomView()
    //history.push("/ten-minutes-blocks");
    //console.log("fetch data")
    Promise.all([
      fetch('./themes/themes.json'),
      fetch('./themes/properties.json'),
      fetch('./themes/images.json')
    ])
      .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
      .then(([data1, data2, data3]) => {
        setThemes(data1);
        setThemeProperties(data2);
        setThemeImages(data3);
        initTheme(store.get('theme') || "default");
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);

  useEffect(() => {
    const geoError = (err) => {
      console.log("No geolocation. Setting saved or default")
      console.log(err.message)

      let loc = store.get("location")
      loc["autodetect"] = false
      loc["error"] = err.code
      store.set("location", loc)
      setLocationGeo(store.get('location'))

      logEvent("error", {
        "error_place": "app",
        "error_type": "geolocation",
        "error_message": err.message
      })

    };

    if (navigator.geolocation) {

      var options = {
        timeout: 10000
      };

      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Got location")
        const loc = {
          "lat": position.coords.latitude,
          "lng": position.coords.longitude,
          "autodetect": true
        }
        setLocationGeo(loc)
        setSunCalcTimes(SunCalc.getTimes(new Date(), loc.lat, loc.lng))
        store.set('location', loc)
      }, geoError, options);
    }

  }, []);

  // render theme
  useEffect(() => {
    //console.log("change theme "+theme)

    // IndexDB
    if (!window.indexedDB) {
      console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    } else {
      //console.log("indexedDB Ready")
      var request = window.indexedDB.open("timetab", 1);
      request.onerror = function (event) {
        console.error("Error opening IndexedDB")
      };
      request.onsuccess = function (event) {
        let db = event.target.result;
        changeImage(db)
      }

      request.onupgradeneeded = function (event) {
        //console.log("IndexedDB created or updated")
        let db = event.target.result;
        db.createObjectStore('images');
        changeImage(db)
      }

      const changeImage = (db) => {

        try {
          const requestImageFile = require.context('../', true);
          const evaluateLogic = (str) => {
            const hs = {
              "sunrise_hs": sunCalcTimes.sunrise.getHours() + sunCalcTimes.sunrise.getMinutes() / 60,
              "sunset_hs": sunCalcTimes.sunset.getHours() + sunCalcTimes.sunset.getMinutes() / 60
            }

            if (str.indexOf("+") > -1) {
              const elements = str.split("+").map(s => s.trim()) // split and trim
              const part1 = hs[elements[0]] ? hs[elements[0]] : parseFloat(elements[0])
              const part2 = hs[elements[1]] ? hs[elements[1]] : parseFloat(elements[1])
              return part1 + part2
            } else if (str.indexOf("-") > -1) {
              const elements = str.split("-").map(s => s.trim()) // split and trim
              const part1 = hs[elements[0]] ? hs[elements[0]] : parseFloat(elements[0])
              const part2 = hs[elements[1]] ? hs[elements[1]] : parseFloat(elements[1])
              return part1 - part2
            } else {
              return hs[str] ? hs[str] : parseFloat(str)
            }

          }

          if (themes && themeProperties && themeImages) {
            const myTheme = _.find(themes, ['name', theme])
            const myThemeLogic = myTheme["logic"]

            for (let index = 0; index < myThemeLogic.length; index++) {
              const timeframeInfo = myThemeLogic[index]

              const h_start = evaluateLogic(timeframeInfo["start"]) // eval(timeframeInfo["start"])
              const h_end = evaluateLogic(timeframeInfo["end"]) // eval(timeframeInfo["end"])

              const now = new Date()
              const hs = (now.getHours() + now.getMinutes() / 60)

              if (hs > h_start && hs < h_end) {
                const random_index = Math.round(Math.random() * (timeframeInfo["theme"].length - 1))
                const mySubTheme = timeframeInfo["theme"][random_index]
                const myThemeProps = _.find(themeProperties, ['name', mySubTheme["props"]])["properties"]
                const myThemeBackgroundImg = mySubTheme["bgdImage"] !== "" ? _.find(themeImages, ['id', mySubTheme["bgdImage"]]) : undefined;

                // theme props, colors
                for (var key in myThemeProps) {
                  if (myThemeProps.hasOwnProperty(key)) {
                    if (key.indexOf("--cursor") > -1) {
                      const cursorImageUrl = requestImageFile("./img/cursors/" + myThemeProps[key]).default
                      document.documentElement.style.setProperty(key, `url('${cursorImageUrl}'), auto`);
                    } else {
                      document.documentElement.style.setProperty(key, myThemeProps[key]);
                    }
                  }
                }

                document.body.classList.remove("full-background");
                if (myThemeBackgroundImg) {
                  document.documentElement.style.setProperty("--background-image-small", `url('${myThemeBackgroundImg["base64"]}')`);
                  try {

                    //console.log(myThemeBackgroundImg["id"])
                    var transaction = db.transaction(["images"]);
                    var objectStore = transaction.objectStore("images");
                    var request = objectStore.get(myThemeBackgroundImg["id"]);
                    request.onerror = function (event) {
                      console.log("Error getting image")
                    };
                    request.onsuccess = function (event) {

                      if (request.result === undefined) {
                        try {
                          // console.log("Download image")
                          // Create XHR
                          var xhr = new XMLHttpRequest(), blob;

                          xhr.open("GET", myThemeBackgroundImg["remoteUri"], true);
                          // Set the responseType to blob
                          xhr.responseType = "blob";

                          xhr.addEventListener("load", function () {
                            if (xhr.status === 200) {
                              // console.log("Image retrieved");

                              // Blob as response
                              blob = xhr.response;
                              // console.log("Blob:" + blob);

                              // Put the received blob into IndexedDB

                              try {

                                var store = db.transaction(['images'], 'readwrite').objectStore('images');

                                // Store the object  
                                var req = store.put(blob, myThemeBackgroundImg["id"]);
                                req.onerror = function (e) {
                                  console.log(e);
                                };
                                req.onsuccess = function (event) {
                                  //console.log('Successfully stored a blob as Blob.');
                                  changeImage(db)
                                };
                              } catch (e) {
                                console.log("error saving blob")
                                console.log(e)
                              }
                            }
                          }, false);
                          // Send XHR
                          xhr.send();

                        } catch (e) { console.log("no remote uri") }
                      } else {

                        // Do something with the request.result!
                        //console.log("get object");

                        var urlCreator = window.URL || window.webkitURL;
                        var imageUrl = urlCreator.createObjectURL(request.result);

                        //console.log(imageUrl);
                        //document.documentElement.style.setProperty("--background-image", `url(data:image/jpeg;base64,${imageUrl})`);

                        var img = new Image();

                        img.onload = function () {
                          document.documentElement.style.setProperty("--background-image", `url('${imageUrl}')`);
                          document.body.classList.add("full-background");
                          setphotoAutor(myThemeBackgroundImg["author"])
                          setphotoUrl(myThemeBackgroundImg["url"])
                        };
                        img.src = imageUrl
                      }
                    };



                  } catch (e) { }

                }
                setphotoAutor(undefined)
                setphotoUrl(undefined)
                break;

              }
            }
          }
        } catch (e) { }

      }


    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <div className="main" tabIndex="0" onKeyDown={(e) => { switchView(e) }}>
      <div className="views">
        {transitions((props, item) => (
          <animated.div style={props}>
            <Switch location={item}>
              <Route exact path="/" ><Welcome times={sunCalcTimes} locationOn={locationGeo.autodetect} moonIllumination={moonIllumination} moonParallacticAngle={moonParallacticAngle} /></Route>
              <Route exact path="/ten-minutes-blocks"><TenMinutesBlocks times={sunCalcTimes} locationOn={locationGeo.autodetect}/></Route>
              <Route exact path="/year-progress"><YearProgress /></Route>
              <Route exact path="/months-columns"><MonthsColumns /></Route>
              <Route exact path="/life-calendar"><LifeCalendar times={sunCalcTimes} locationOn={locationGeo.autodetect}/></Route>
            </Switch>
          </animated.div>
        ))}
      </div>
      <Footer photoAuthor={photoAutor} photoUrl={photoUrl} openSettings={openSettingsModal} switchMessage={switchMessage} />
      <Modal
        isOpen={settingsIsOpen}
        //onAfterOpen={afterOpenModal}
        closeTimeoutMS={300}
        onRequestClose={closeSettingsModal}
        style={modalCustomStyles}
        contentLabel="Example Modal"
      ><Settings location={locationGeo} closeSettings={closeSettingsModal} changeLocation={changeLocation} changeLanguagee={changeLanguage} themes={themes} themeProps={themeProperties} backgroundImages={themeImages} changeTheme={changeTheme} /></Modal>
    </div >
  );
}

export default App;

