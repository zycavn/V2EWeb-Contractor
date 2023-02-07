import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {
  httpClient: HttpClient;
  baseUrl: string;
  private _jsonURL = 'assets/drawingCodes.json';
  
  constructor(http: HttpClient) {
    this.httpClient = http;
    this.baseUrl = 'https://developer.api.autodesk.com';    
  }

  // Ref: https://forge.autodesk.com/en/docs/oauth/v2/reference/http/authenticate-POST/
	authenticate() : Observable<any> {
		const uri = `${this.baseUrl}/authentication/v1/authenticate`;
    // console.log('URI: ' + uri);

    const params = new HttpParams()
      .set('client_id', '8wykAoBo4OdqElK4gAIjubClBWnA6PAG')
      .set('client_secret', 'OpPn0Sj7cMvpXdgp')
      .set('grant_type', 'client_credentials')
      .set('scope', 'data:read viewables:read');


		let headers: HttpHeaders = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded'
		});

		return this.httpClient.post<any>(uri, params, { headers });
	}

  getCostCodes(): Observable<any> {
    return this.httpClient.get(this._jsonURL);
  }
}
