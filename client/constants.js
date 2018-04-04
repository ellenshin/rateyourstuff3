var Constants = {

  //Text
  PAGE_TITLE: "RateYourStuff",

  //Timeouts
  ALERT_MESSAGE_TIMEOUT: 10, //Set to 10 thousand miliseconds

  //Authorization
  LOGIN_URL_LOCAL: '/auth/login/local',
  LOGIN_URL_FACEBOOK: '/auth/login/facebook',
  LOGIN_URL_GOOGLE: '/auth/login/google',
  REGISTER_URL_LOCAL: '/auth/register/local',
  
  //Hello.js
  FACEBOOK_APP_ID: "2353889744835609",
  FACEBOOK_APP_SECRET: "8abebe5201dee56a57e8200a4d0445bb",

  GOOGLE_APP_ID: "614545485749-oig4iircafuop4u2vqusqhf4fslm4kp1.apps.googleusercontent.com",
  GOOGLE_APP_SECRET: "2XSXwe7bpN4IS1so5CcRm365",

  LAST_FM_SEARCH_ALBUMS: 'https://ws.audioscrobbler.com/2.0/?method=album.search&album=',
  LAST_FM_API: '&api_key=57468c7603262db4ad67f48474468b8e&format=json',
  LAST_FM_ALBUM_INFO: 'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=57468c7603262db4ad67f48474468b8e&mbid=',
  LAST_FM_ALBUM_INFO_2: '&format=json',
  
  GOOGLE_SEARCH_BOOKS: 'https://www.googleapis.com/books/v1/volumes?q=',
  GOOGLE_BOOKS_API: '&key=AIzaSyA4_kUw_aggE-4HWPxbjAiPzgBF_vRe2tg',

  OMDB_API: 'https://www.omdbapi.com/?apikey=84b16007&s=',
  //Todo apis
  API_TASKS_GETALL: '/api/task_getall',
  API_TASKS_CREATE: '/api/task_create',
  API_TASKS_TOGGLEDONE: '/api/task_toggledone',
  API_TASKS_DELETE: '/api/task_delete',
  API_TASK_NEWTITLE: '/api/task_rename',
  
  API_TAGS_GETBYID: '/api/tags_getbyid',
  API_TAGS_GETALL: '/api/tasktag_getall',
  API_TAGS_CREATE: '/api/tasktag_create',
  API_TAGS_DELETE: '/api/tasktag_delete',
  API_TAG_NEWRATING: 'api/tag_newrating'
}  

export default Constants;