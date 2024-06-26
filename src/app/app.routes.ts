import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './authentication/auth.guard';
import { HomeComponent } from './home/home.component';
import { TransactionFormComponent } from './transactions/transaction-form/transaction-form.component';

export const routes: Routes = [
    {path:'', redirectTo: '/home', pathMatch:'full'},
    {
        path:'dashboard',
        canActivate: [authGuard] , 
        loadComponent: () => import('./dashboard/dashboard.component').then(module => module.DashboardComponent)
    },
    {
        path:'signup', 
        loadComponent: () => import('./sign-up/sign-up.component').then(module => module.SignUpComponent)
    },
    {path:'transactions', canActivate: [authGuard] , component: TransactionsComponent},
    {path:'accounts' , canActivate: [authGuard], component: AccountsComponent},
    {path:'profile', canActivate: [authGuard], component: ProfileComponent},
    {path:'home', canActivate: [authGuard], component: HomeComponent},
    {path:'transactions/new', canActivate: [authGuard], component: TransactionFormComponent},
    {path:'login', component: LoginComponent},
    // { path: '**', component: NoFoundComponent}
];
