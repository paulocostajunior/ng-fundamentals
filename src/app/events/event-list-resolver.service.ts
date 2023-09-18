import { Injectable } from "@angular/core";
import { EventService } from "./shared/event.service";

@Injectable()
export class EventListResolver {
    constructor(private eventService: EventService) {}

    resolve() {
        return this.eventService.getEvents()
    }
}