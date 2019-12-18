// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://3.134.77.123:8000/api/',
  frontUrl: 'http://localhost:4200/',
};

/*http://localhost:8000/
*apiUrl: 'http://localhost:8000/ec2-3-14-4-46.us-east-2.compute.amazonaws.com/',
  frontUrl: 'http://localhost:4200/ec2-3-14-4-46.us-east-2.compute.amazonaws.com/',

  
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 * export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/',
  frontUrl: 'http://localhost:4200/',
};
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
