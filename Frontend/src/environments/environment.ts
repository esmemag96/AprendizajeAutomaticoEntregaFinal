// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  getStudentEndpoint: "http://localhost:7071/api/GetUser",
  createEcoaEndpoint: "http://localhost:7071/api/Sentiments",
  loginStudentEndpoint: "http://localhost:7071/api/studentLogin",
  loginAdminEndpoint: "http://localhost:7071/api/professorLogin",
  
  scoreApiEndpoint: "http://localhost:5000/predict",
  trainApiEndpoint: "http://localhost:5000/train",
  textApiEndpoint:  "http://localhost:5000/sentiment-analysis",
  graphApiEndpoint:  "http://localhost:5000/getGraphs"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
