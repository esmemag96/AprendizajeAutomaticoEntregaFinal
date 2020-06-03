// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Functions Azure
  getStudentEndpoint: "https://profesoresaprendizajefinal.azurewebsites.net/api/GetUser?code=caBVrHXhCeg2cQzRogA8C3jXCbop74SgZFPgkjGJiJ5JOoxyjBa03w==",
  createEcoaEndpoint: "https://profesoresaprendizajefinal.azurewebsites.net/api/CreateEcoa?code=pffHHCyjuhR/wVLZUW4XhU9hya1nxAl0j6/9EgVqmA1DU/dRwGt6Yw==",
  loginStudentEndpoint: "https://profesoresaprendizajefinal.azurewebsites.net/api/studentLogIn?code=KxPjgUN38ZH08SFNib7wgAJ/pHOsBH1vMYdHqs4a6og5SroZta4SyQ==",
  loginAdminEndpoint: "https://profesoresaprendizajefinal.azurewebsites.net/api/professorLogin?code=MCwUHR0a2AN3rTmsaodXtyzFVa6zPIkLS9qRIHDFpEdZPf6T30U3lQ==",
  getEcoasbyIdProfesor: "https://profesoresaprendizajefinal.azurewebsites.net/api/GetEcoasbyIdProfesor?code=/8PxXtmVoyCHJ8qUVSC2RXtQOcmM7axNt9uSgooUqvaiQASGa4cesA==",
  getProfessor: "https://profesoresaprendizajefinal.azurewebsites.net/api/GetProfesor?code=aCll369IB7qO7akgDe8vRM7x0ylPZjro1cLgKo31D/5kkhLrVSGyyw==",
  

  // Functions Flask
  scoreApiEndpoint: "http://localhost:5000/predict",
  trainApiEndpoint: "http://localhost:5000/train",
  textApiEndpoint:  "http://localhost:5000/sentiment-analysis",
  graphApiEndpoint: "http://localhost:5000/getGraphs"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
