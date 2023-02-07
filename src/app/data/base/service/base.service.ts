import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationSettings } from 'src/app/core/config/application-settings';

export class BaseService {
	protected httpClient: HttpClient;
	protected apiVersion = '1.0';
	protected baseUrl: string;
	protected queryString: string;

	constructor(http: HttpClient, protected module: string, protected resourceName: string) {
		this.baseUrl = ApplicationSettings.apiUrl;
		this.httpClient = http;
		this.queryString = '';
	}

	protected routeUri(): string {
		return `${this.baseUrl}/${this.module}/${this.resourceName}`;
	}

	protected fetch(): Observable<any> {
		return this.httpClient.get(`${this.baseUrl}/${this.module}/${this.resourceName}`);
	}

	protected fetchByRoute(resourceRoute: string): Observable<any> {
		return this.httpClient.get(`${this.baseUrl}/${this.module}/${this.resourceName}/${resourceRoute}`);
	}

	protected fetchByRouteAndQuerystring(resourcePath: string): Observable<any> {
		return this.httpClient.get(`${this.baseUrl}/${this.module}/${this.resourceName}/${resourcePath}${this.queryString}`);
	}
}
