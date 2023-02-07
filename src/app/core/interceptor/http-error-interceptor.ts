import { Injectable, isDevMode } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/app/data/shared/schema/payloads/error-response';
import { MsalService } from '@azure/msal-angular';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, 
    private authService: MsalService)
    {}

  // Reference: https://careydevelopment.us/blog/angular-how-to-handle-errors-with-an-http-interceptor
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let handled: boolean = false;
    const numberOfRetries: number = 0;

    // console.log(`INTERCEPT_ERROR`);

    return next.handle(request).pipe(
      retry(numberOfRetries),
      catchError((returnedError) => {
        let statusCode!: number;
        let errorMessage!: string;
        let referenceId!: string;

        if (returnedError.error instanceof ErrorEvent) {
          // console.log(`ErrorEvent: ${JSON.stringify(returnedError)}`);
          statusCode = returnedError.status;
          errorMessage = `${returnedError.error.message}`;
          referenceId = returnedError.error.referenceId;
        } else if (returnedError instanceof HttpErrorResponse) {
          // console.log(`HttpErrorResponse: ${JSON.stringify(returnedError)}`);

          if (returnedError.error !== null) {
            statusCode = returnedError.error.statusCode;
            errorMessage = this.getServerSideErrorMessage(returnedError);
            referenceId = returnedError.error.referenceId;  
          } else {
            console.log(`ERROR_NULL`);
            statusCode = returnedError.status;
            errorMessage = this.getClientSideErrorMessage(returnedError);
          }
        }

        let errorResponse: ErrorResponse = {
          statusCode: statusCode,
          message: errorMessage,
          referenceId: referenceId,
        };

        if (isDevMode()) {
          console.error(returnedError);
        }

        // console.log(`RETURN: ${JSON.stringify(errorResponse)}`);
        return throwError(errorResponse);
      })
    );
  }

  getClientSideErrorMessage(error: HttpErrorResponse): string {
    let errorMessage!: string;

    switch (error.status) {
      case 0:
        // console.log(`0: ${JSON.stringify(error)}`);
        errorMessage = `Unable to connect to services.`;
        break;

      case 400:
        // console.log(`400: ${JSON.stringify(error)}`);
        errorMessage = `The resource cannot be retrieved due to an invalid request.`;
        break;

      case 401:
        // console.log(`401: ${JSON.stringify(error)}`);
        errorMessage = `The request was unauthorised.`;
        break;

      case 403:
        // console.log(`403: ${JSON.stringify(error)}`);
        errorMessage = `The request is not allowed.`;
        break;

      case 404:
        // console.log(`404: ${JSON.stringify(error)}`);
        errorMessage = `The requested resource could not be found.`;
        break;

      case 500:
        // console.log(`500: ${JSON.stringify(error)}`);
        errorMessage = `An unexpected problem has occurred.`;
        break;

      default:
        errorMessage = `An unexpected problem has occurred.`;
        break;
    }

    return errorMessage;

  }

  private getServerSideErrorMessage(error: HttpErrorResponse): string {
    let errorMessage!: string;
    console.log(`Handling Error: ${JSON.stringify(error)}`);
    // console.log(`error: ${error}`);
    // console.log(`error.error: ${error.error}`);

    switch (error.status) {
      case 0:
        // console.log(`0: ${JSON.stringify(error)}`);
        errorMessage = `Unable to connect to services.`;
        break;

      case 400:
        // console.log(`400: ${JSON.stringify(error)}`);
        errorMessage = error.error.message;
        break;

      case 401:
        // console.log(`401: ${JSON.stringify(error)}`);
        errorMessage = error.error.message;
        break;

      case 403:
        // console.log(`403: ${JSON.stringify(error)}`);
        errorMessage = error.error.message;
        break;

      case 404:
        // console.log(`404: ${JSON.stringify(error)}`);
        if (error.error.message === undefined) {
          errorMessage = error.error;
        } else {
          errorMessage = error.error.message;
        }
        break;

      case 500:
        // console.log(`500: ${JSON.stringify(error)}`);
        errorMessage = `A services problem has occurred.`;
        break;

      default:
        errorMessage = `An unexpected problem has occurred.`;
        break;
    }

    return errorMessage;
  }
}
