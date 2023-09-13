import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  EventsListAppComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  EventService,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent
} from './events/index';
import { NavBarComponent } from './nav/navbar.component';
import { IToastr, TOASTR_TOKEN } from './common/toastr.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from './route';
import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { DurationPipe } from './events/shared/duration.pipe';

let toastr: IToastr = (window as any)['toastr'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListAppComponent,
    EventThumbnailComponent,
    SessionListComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent,
    Error404Component,
    CollapsibleWellComponent,
    DurationPipe
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr},
    EventRouteActivator,
    AuthService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    },
    EventListResolver,
  ],
  bootstrap: [EventsAppComponent]
})
export class EventsAppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?')
  }
  return true
}
