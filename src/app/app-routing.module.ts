import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicAppLayoutComponent } from './layout/public-app-layout/public-app-layout.component';

const routes = [
	{
		path: '',
		text: '',
		data: {
			module: 'Home',
			isPublic: true,
			isVisible: false,
			canRender: false,
			routeRoles: []
		},
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: '',
		text: 'Home',
		data: {
			module: 'Home',
			isPublic: true,
			isVisible: true,
			canRender: false,
			routeRoles: []
		},
		childPath: 'home',
		component: PublicAppLayoutComponent,
		children: [
			{
				path: 'home',
				loadChildren: () =>
					import('./modules/home/home.module').then(m => m.HomeModule)
			}
		]
	}
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: false,
			initialNavigation: !isIframe ? 'enabled' : 'disabled',
		}),
	],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule { }
