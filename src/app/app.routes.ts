import { Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ViewPageComponent } from './pages/view-page/view-page.component';

export const routes: Routes = [
    {path:'register',component:RegisterPageComponent},
    {path:'view',component:ViewPageComponent}
];
