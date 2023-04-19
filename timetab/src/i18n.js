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
        "donations": {
          "title" : "Donations",
          "text" : "Have you ever wondered why programmers never see the sun?<1 />Because they're busy creating tools like this extension! But seriously, if you like what we do, please consider supporting us with a donation so we can keep improving!",
          "developedBy" : "'Timetab' is a product developed by <1 target='_blank' rel='noreferrer' href='https://poinglabs.com'>Poing Labs.</1>",
          "mpButton" : "Donate 200 ARS"
        },
        "holidays": {
          "title": "Holidays",
          "description" : "Import public holidays of a country, they will be display in the Month Columns and Next Holiday view. Please note that there may be some errors in the imported holidays. See <1 href='#' onClick={handleShowHolidayInstruction} style={{textDecoration: 'underline', pointer: 'cursor'}}>how to add or remove holidays</1>.",
          "import": "Import",
          "delete": "Delete holidays",
          "select": "Select a country",
          "importing" : "Importing...",
          "importsuccess" : "Success. {{importedHolidays}} holidays imported",
          "deletesuccess" : "Success. Imported events deleted.",
          "errtoomanyevents" : "Error. Too many events",
          "errpleaseselect" : "Error. Please select a country",
          "errfetching" : "Error fetching data",
          "howto_title": "How to add or remove holidays",
          "howto_add": "Click on the weekday of a particular day to add a 'Free day' to that date.",
          "howto_delete": "Click on the little dot to remove that event",
          "howto_advanced": "Advanced: Events and holidays are stored in localStorage under the key 'events'. Feel free to edit that value to add or remove custom events."
        },
        "pleaseShareLocation" : "Please enable location settings in your <1 target='_blank' href='https://support.google.com/chrome/answer/142065'>browser</1> and OS to get the full theme experience",
        "locationOs" : "Important: If you're using Chrome on a Mac desktop, you may get a notification that 'Location is turned off in your Mac system preferences.' To update your computer's location preferences, follow the onscreen instructions.",
        "share" : "Share",
        "shareMessage" : "Revamp your new tab page with Timetab. Check out this Chrome extension to stay on top of your life!"
      },
      "newevent" : {
        "save" : "Save",
        "close" : "Close",
        "eventDescription" : "Event description"
      },
      "seasons" : {
        "daystoDefault" : "{{days}} days to next season",
        "daysto" : "{{days}} days to {{nextSeason}}",
        "fall" : "fall",
        "winter" : "winter",
        "summer" : "summer",
        "spring" : "spring"
      },
      "next-holiday": {
        "title" : "Next holiday in",
        "day" : "day",
        "days" : "days",
        "howto": "See <1 className='howto' onClick={{handleClickHowTo}}>How to add holidays</1> in Settings"
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
      "lifeInWeeks" : "Your life in weeks",
      "pressSpace" : "Press <1 className='container-space-bar__space-bar blink'>Space</1> for next view"
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
        "donations": {
          "title" : "Donaciones",
          "text" : "¿Alguna vez te has preguntado por qué los programadores nunca ven el sol?<1 />¡Porque están ocupados creando herramientas como esta extensión! Pero en serio, si te gusta lo que hacemos, por favor considera apoyarnos con una donación para que podamos seguir mejorando.",
          "developedBy" : "'Timetab' es un producto desarrollado por <1 target='_blank' rel='noreferrer' href='https://poinglabs.com'>Poing Labs.</1>",
          "mpButton" : "Donar $200"
        },
        "holidays": {
          "title": "Feriados",
          "description" : "Importá feriados públicos de un país, van a aparecer en la vista Calendario y Próximo Feriado. Tener en cuenta que podría haber algun error en los feriados importados. Ver <1 href='#' onClick={handleShowHolidayInstruction} >cómo agregar y borrar feriados</1>.",
          "import": "Importar",
          "delete": "Eliminar feriados",
          "select": "Seleccionar país",
          "importing" : "Importando...",
          "importsuccess" : "Éxito. {{importedHolidays}} feriados fueron importados.",
          "deletesuccess" : "Éxito. Eventos importados fueron eliminados.",
          "errtoomanyevents" : "Error. Demasiados eventos",
          "errpleaseselect" : "Error. Por favor seleccionar un país",
          "errfetching" : "Error al importar datos",
          "howto_title": "Cómo agregar y borrar feriados",
          "howto_add": "Haga clic en el día de la semana de un día concreto para añadir un D'ía libre' a esa fecha.",
          "howto_delete": "Haga clic en el pequeño punto para eliminar ese evento",
          "howto_advanced": "Avanzado: Los eventos y días festivos se almacenan en localStorage bajo la clave 'events'. Siéntete libre de editar ese valor para añadir o eliminar eventos personalizados."
        },
        "pleaseShareLocation" : "Por favor active la configuración de ubicación en su <1 target='_blank' href='https://support.google.com/chrome/answer/142065'>navegador</1> y sistema operativo para obtener la experiencia completa del tema",
        "locationOs" : "Importante: Si estás usando Chrome en un ordenador Mac, es posible que aparezca la notificación 'La ubicación está desactivada en las preferencias del sistema de Mac.' Para actualizar las preferencias de ubicación de tu ordenador, sigue las instrucciones que aparecen en pantalla.",
        "share" : "Compartir",
        "shareMessage" : "Renueva tu página de pestaña nueva con Timetab. ¡Descubre esta extensión de Chrome para mantenerte al día con tu vida!"
      },
      "newevent" : {
        "save" : "Guardar",
        "close" : "Cerrar",
        "eventDescription" : "Descripción del evento"
      },
      "seasons" : {
        "daystoDefault" : "Faltan {{days}} días para la próxima estación del año",
        "daysto" : "Faltan {{days}} días para {{nextSeason}}",
        "fall" : "otoño",
        "winter" : "invierno",
        "summer" : "verano",
        "spring" : "primavera"
      },
      "next-holiday": {
        "title" : "Próximo feriado en",
        "day" : "día",
        "days" : "días",
        "howto": "Ver <1 className='howto' onClick={{handleClickHowTo}}>Cómo agregar feriados</1> en Ajustes"
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
      "lifeInWeeks" : "Tu vida en semanas",
      "pressSpace" : "Presione <1 className='container-space-bar__space-bar blink'>Espacio</1> para siguiente vista"
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
        "donations": {
          "title" : "Spenden",
          "text" : "Hast du dich jemals gefragt, warum Programmierer niemals die Sonne sehen?<1 />Weil sie damit beschäftigt sind, Tools wie diese Erweiterung zu erstellen! Aber im Ernst, wenn dir gefällt, was wir tun, bitte unterstütze uns mit einer Spende, damit wir uns weiter verbessern können!",
          "developedBy" : "'Timetab' ist ein Produkt, das von <1 target='_blank' rel='noreferrer' href='https://poinglabs.com'>Poing Labs</1> entwickelt wurde.",
          "mpButton" : "200 ARS spenden"
        },
        "holidays": {
          "title": "Feiertage",
          "description" : "Importieren Sie die Feiertage eines Landes. Sie werden in den Monatsspalten und in der Ansicht Nächster Feiertag angezeigt. Bitte beachten Sie, dass es bei den importierten Feiertagen einige Fehler geben kann. Siehe, <1 className='fakelink' onClick={handleShowHolidayInstruction}>Wie man Feiertage hinzufügt oder entfernt</1>.",
          "import": "Importieren",
          "delete": "Feiertage entfernen",
          "select": "Land auswählen",
          "importing" : "Importiere...",
          "importsuccess" : "Erfolg. {{importedHolidays}} Feiertage wurden importiert.",
          "deletesuccess" : "Erfolg. Importierte Ereignisse wurden gelöscht.",
          "errtoomanyevents" : "Fehler. Zu viele Ereignisse",
          "errpleaseselect" : "Fehler. Bitte ein Land auswählen",
          "errfetching" : "Fehler beim Abrufen der Daten",
          "howto_title": "Wie man Feiertage hinzufügt oder entfernt",
          "howto_add": "Klicken Sie auf den Wochentag eines bestimmten Tages, um einen 'freien Tag' zu diesem Datum hinzuzufügen.",
          "howto_delete": "Klicken Sie auf den kleinen Punkt, um das Ereignis zu entfernen.",
          "howto_advanced": "Erweitert: Ereignisse und Feiertage werden in localStorage unter dem Schlüssel 'events' gespeichert. Sie können diesen Wert bearbeiten, um eigene Ereignisse hinzuzufügen oder zu entfernen.",
          "locationOs" : "Wichtig: Wenn Sie Chrome auf einem Mac-Computer verwenden, wird Ihnen möglicherweise die Benachrichtigung „Standortermittlung ist in den Mac-Systemeinstellungen deaktiviert“ angezeigt. Folgen Sie der Anleitung auf dem Bildschirm, um die Standorteinstellungen auf Ihrem Computer zu aktualisieren."
        },
        "pleaseShareLocation" : "Bitte aktivieren Sie die Standortseinstellungen in Ihrem <1 target='_blank' href='https://support.google.com/chrome/answer/142065'>Browser</1> und Betriebssystem, um das Thema in vollem Umfang nutzen zu können",
        "locationOs" : "Wichtig: Wenn Sie Chrome auf einem Mac-Computer verwenden, wird Ihnen möglicherweise die Benachrichtigung „Standortermittlung ist in den Mac-Systemeinstellungen deaktiviert“ angezeigt. Folgen Sie der Anleitung auf dem Bildschirm, um die Standorteinstellungen auf Ihrem Computer zu aktualisieren.",
        "share" : "Teilen",
        "shareMessage" : "Gib deiner new-tab page mit Timetab einen neuen Look. Entdecke diese Chrome-Erweiterung, um dein Leben im Griff zu haben!"
      },
      "newevent" : {
        "save" : "Speichern",
        "close" : "Schließen",
        "eventDescription" : "Beschreibung des Events"
      },
      "seasons" : {
        "daystoDefault" : "{{days}} Tage bis zur nächsten Jahreszeit",
        "daysto" : "{{days}} Tage bis zum {{nextSeason}}",
        "fall" : "Herbst",
        "winter" : "Winter",
        "summer" : "Sommer",
        "spring" : "Frühling"
      },
      "next-holiday": {
        "title" : "Nächster Feiertag in",
        "day" : "Tag",
        "days" : "Tagen",
        "howto": "Siehe <1 className='howto' onClick={{handleClickHowTo}}>Wie man Feiertage hinzufügt</1> in Einstellungen"
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
      "lifeInWeeks" : "Dein Leben in Wochen",
      "pressSpace" : "<1 className='container-space-bar__space-bar blink'>Leertaste</1> drücken für nächste Ansicht"
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