import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { NoteListComponent } from './components/notes/note-list.component';
import { NoteCreateComponent } from './components/notes/note-create.component';
import { AnalyticsComponent } from './components/dashboard/analytics.component';
import { ShareManagementComponent } from './components/sharing/manage-sharing.component';
import { ShareNoteComponent } from './components/notes/share-note.component';
import { NoteEditComponent } from './components/notes/note-edit.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UsersComponent } from './components/menu/users.component';
import { RolesComponent } from './components/menu/roles.component';
import { ViewNoteComponent } from './components/notes/view-note.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
   {
    path: 'menu',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'notes', pathMatch: 'full' },
      { path: 'notes', component: NoteListComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: AnalyticsComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
      { path: 'notes/view/:id', component: ViewNoteComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notes/new', component: NoteCreateComponent, canActivate: [AuthGuard] },
  { path: 'manage-sharing/:id', component: ShareManagementComponent, canActivate: [AuthGuard] },
  { path: 'notes/share/:id', component: ShareNoteComponent, canActivate: [AuthGuard] },
  { path: 'notes/edit/:id', component: NoteEditComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

