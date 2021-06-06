import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

const resources = {
  en: {
    translation: {
      "settings": {
        "settings":"Settings",
        "theme": "Theme",
        "language": "Language",
        "location": "Location",
        "latitude":"Latitude",
        "longitude":"Longitude",
        "autodetect":"Autodetect",
        "pleaseShareLocation" : "Please enable location settings in your <1 target='_blank' href='https://support.google.com/chrome/answer/142065'>browser</1> and OS to get the full theme experience"
      },
      "themes" : {
        "default": "Mix",
        "beach": "Beach",
        "mountain": "Mountains",
        "light": "Light",
        "dark": "Dark"
      },
      "clock":{
        "timerNotification" : "Timer of {{minutes}} minutes ended!",
        "timerNotificationTitle" : "Timer ended!"
      },
      "time":{
        "weekdays":{
          "0":"Sunday",
          "1":"Monday",
          "2":"Tuesday",
          "3":"Wednesday",
          "4":"Thursday",
          "5":"Friday",
          "6":"Saturday"
        },
        "months":{
          "0":"January",
          "1":"February",
          "2":"March",
          "3":"April",
          "4":"May",
          "5":"June",
          "6":"July",
          "7":"August",
          "8":"September",
          "9":"October",
          "10":"November",
          "11":"December"
        }
      },
      "sunhours": {
        "beforeSunset": "Sunset in <1 className='sun-hours__info-minutes'>{{minutes}}</1> minutes",
        "beforeSunrise": "Sunrise in <1 className='sun-hours__info-minutes'>{{minutes}}</1> minutes"
      },
      "moonPhases": {
        "newMoon" : "New Moon",
        "waxingCrescent" : "Waxing Crescent",
        "firstQuarter" : "First Quarter",
        "waxingGibbous" : "Waxing Gibbous",
        "fullMoon" : "Full Moon",
        "waningGibbous" : "Waning Gibbous",
        "lastQuarter" : "Last Quarter",
        "waningCresent" : "Waning Crescent"
      },
      "photoBy" : "Photo by",
      "blocksQuestion" : "How is this useful?",
      "inTenMinBlock" : "in 10 minutes blocks",
      "enterBirthday" : "To view your life calendar, enter your date of birth",
      "show" : "Show",
      "lifeInWeeks" : "Your life in weeks"
  },
  },
  es: {
    translation: {
      "settings": {
        "settings":"Ajustes",
        "theme": "Tema",
        "language": "Idioma",
        "location": "Ubicación",
        "latitude":"Latitud",
        "longitude":"Longitud",
        "autodetect":"Autodetectar",
        "pleaseShareLocation" : "Por favor active la configuración de ubicación en su <1 target='_blank' href='https://support.google.com/chrome/answer/142065'>navegador</1> y sistema operativo para obtener la experiencia completa del tema"
      },
      "themes" : {
        "default": "Variado",
        "beach": "Playa",
        "mountain": "Montañas",
        "light": "Claro",
        "dark": "Oscuro"
      },
      "clock":{
        "timerNotification" : "Timer de {{minutes}} minutos terminó!",
        "timerNotificationTitle" : "Tiempo terminó!"
      },
      "time":{
        "weekdays":{
          "0":"Domingo",
          "1":"Lunes",
          "2":"Martes",
          "3":"Miercoles",
          "4":"Jueves",
          "5":"Viernes",
          "6":"Sábado"
        },
        "months":{
          "0":"Enero",
          "1":"Febrero",
          "2":"Marzo",
          "3":"Abril",
          "4":"Mayo",
          "5":"Junio",
          "6":"Julio",
          "7":"Agosto",
          "8":"Septiembre",
          "9":"Octubre",
          "10":"Noviembre",
          "11":"Deciembre"
        }
      },
      "sunhours": {
        "beforeSunset": "Quedan <1 className='sun-hours__info-minutes'>{{minutes}}</1> minutos de sol",
        "beforeSunrise": "Amanece en <1 className='sun-hours__info-minutes'>{{minutes}}</1> minutos"
      },
      "moonPhases": {
        "newMoon" : "Luna nueva",
        "waxingCrescent" : "Luna creciente",
        "firstQuarter" : "Cuarto creciente",
        "waxingGibbous" : "Luna gibosa creciente",
        "fullMoon" : "Luna llena",
        "waningGibbous" : "Luna gibosa menguante",
        "lastQuarter" : "Cuarto menguante",
        "waningCresent" : "Luna menguante"
      },
      "photoBy" : "Foto de",
      "blocksQuestion" : "¿Qué utilidad tiene esto?",
      "inTenMinBlock" : "en bloques de 10 minutos",
      "enterBirthday" : "Para ver tu calendario, ingresá tu fecha de nacimiento",
      "show" : "Mostrar",
      "lifeInWeeks" : "Tu vida en semanas"
  },
  },
  de: {
    translation: {
      "settings": {
        "settings":"Einstellungen",
        "theme": "Theme",
        "language": "Sprache",
        "location": "Standort",
        "latitude":"Breitengrad",
        "longitude":"Längengrad",
        "autodetect":"Autodetect",
        "pleaseShareLocation" : "Bitte aktivieren Sie die Standortseinstellungen in Ihrem <1 target='_blank' href='https://support.google.com/chrome/answer/142065'>Browser</1> und Betriebssystem, um das Thema in vollem Umfang nutzen zu können"
      },
      "themes" : {
        "default": "Mix",
        "beach": "Strand",
        "mountain": "Berge",
        "light": "Hell",
        "dark": "Dunkel"
      },
      "clock":{
        "timerNotification" : "{{minutes}}-Minuten-Takt beendet",
        "timerNotificationTitle" : "Timer beendet!"
      },
      "time":{
        "weekdays":{
          "0":"Sontag",
          "1":"Montag",
          "2":"Dienstag",
          "3":"Mittwoch",
          "4":"Donerstag",
          "5":"Freitag",
          "6":"Samstag"
        },
        "months":{
          "0":"Januar",
          "1":"Februar",
          "2":"Marz",
          "3":"April",
          "4":"Mai",
          "5":"Juni",
          "6":"Juli",
          "7":"August",
          "8":"September",
          "9":"Oktober",
          "10":"November",
          "11":"Dezember"
        }
      },
      "sunhours": {
        "beforeSunset": "Sonnenuntergang in <1 className='sun-hours__info-minutes'>{{minutes}}</1> Minuten",
        "beforeSunrise": "Sonnenaufgang in <1 className='sun-hours__info-minutes'>{{minutes}}</1> Minuten"
      },
      "moonPhases": {
        "newMoon" : "Neumond",
        "waxingCrescent" : "erstes Viertel bzw. zunehmende Sichel",
        "firstQuarter" : "zunehmender Halbmond",
        "waxingGibbous" : "zweites Viertel",
        "fullMoon" : "Vollmond",
        "waningGibbous" : "drittes Viertel",
        "lastQuarter" : "abnehmender Halbmond",
        "waningCresent" : "letztes Viertel bzw. abnehmende Sichel"
      },
      "photoBy" : "Foto von",
      "blocksQuestion" : "Wie nützlich ist das?",
      "inTenMinBlock" : "in 10-Minuten-Blöcken",
      "enterBirthday" : "Um deinen Kalender zu sehen, gib dein Geburtsdatum ein",
      "show" : "Anzeigen",
      "lifeInWeeks" : "Dein Leben in Wochen"
  },
  },
};

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  //.use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    //load: 'all',
    debug: false,
    supportedLngs: ['en', 'de', 'es'],
    nonExplicitSupportedLngs: true,
    react: { 
        useSuspense: false //   <---- this will do the magic
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;