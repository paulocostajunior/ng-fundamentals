import { Routes } from "@angular/router";
import { Error404Component } from "./errors/404.component";
import {
    CreateEventComponent, EventDetailsComponent,
    EventListResolver,
    EventsListAppComponent,
    CreateSessionComponent,
    EventResolver
} from './events/index';

export const appRoutes: Routes = [
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    { path: 'events', component: EventsListAppComponent, resolve: { events: EventListResolver } },
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: 'events/:id', component: EventDetailsComponent, resolve: { event: EventResolver} },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module')
            .then(m => m.UserModule)
    }
]