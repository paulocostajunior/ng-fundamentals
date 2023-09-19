import { Injectable } from "@angular/core";
import { EventService } from "./shared/event.service";
import { ActivatedRouteSnapshot } from "@angular/router";

@Injectable()
export class EventResolver {
    constructor(private eventService: EventService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.eventService.getEvent(route.params['id'])
    }
}