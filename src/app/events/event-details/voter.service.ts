import { Injectable } from "@angular/core";
import { EventService, ISession } from "../shared";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs";

@Injectable()
export class VoterService {
    constructor(private http: HttpClient, private eventService: EventService) {}

    deleteVoter(eventId: number, session: ISession, voterName: string) {
        session.voters = session.voters.filter(voter => voter !== voterName)

        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`

        this.http.delete(url)
            .pipe(catchError(this.eventService.handleError('addVoter')))
            .subscribe()
    }

    addVoter(eventId: number, session: ISession, voterName:string) {
        session.voters.push(voterName)
        const options = { headers: new HttpHeaders({ 'Content-Type': '/application/json' }) }
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`
        this.http.post(url, {}, options)
            .pipe(catchError(this.eventService.handleError('addVoter')))
            .subscribe()
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(voter => voter === voterName)
    }
}