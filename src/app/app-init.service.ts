import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

declare var window: any;

@Injectable()
export class AppInitService {

  constructor(
    private http: HttpClient,
  ) { }

  init() {
    return this.http.get('../env-config.json').pipe(map(result => {
      // set env config in global variable window
      window.envConfig = result;
      return result;
    })).toPromise();
  }
}
