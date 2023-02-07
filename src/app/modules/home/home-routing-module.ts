import { RouterModule, Routes } from '@angular/router';
import { DisplayModelComponent } from './page/display-model/display-model.component';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'display-model',
    component: DisplayModelComponent
  }
];

export const HomeRoutes = RouterModule.forChild(routes);