import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppSettings } from '../app.settings';

@Injectable()
export class ExchangeService {

  constructor(private http: Http) { }

  getExchange(reference, symbol) {

    const headers = new Headers();
    headers.append('Authorization', 'bearer ' + localStorage.getItem('tokenUserBelatrix'));
    const options = new RequestOptions({headers: headers});

    return this.http.get(
      AppSettings.BASE_PATH +
      AppSettings.QUOTATION +
      '?reference=' + reference +
      '&exchanges=' + symbol,
      options
    )
      .map((response: Response) => {
        return response.json();
      });
  }

}
