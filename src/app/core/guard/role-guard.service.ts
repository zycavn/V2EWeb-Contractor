import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { SecurityService } from 'src/app/data/shared/service/core/security.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authService: MsalService,
    private securityService: SecurityService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // If the user is only assigned to a single role, then we can't split. Push!
    const claims: any = this.authService.instance.getActiveAccount()?.idTokenClaims;
    // console.log(`Role Guard.CLAIMS: ${JSON.stringify(claims)})`);

    // console.log(`Role Guard.DATA: ${JSON.stringify(route.data)})`);
    const result = this.securityService.claimsHaveExpectedRole(claims, route.data['routeRoles']);
    // console.log(`Role Guard.RESULT: ${result}`);

    return result;
  }
}
