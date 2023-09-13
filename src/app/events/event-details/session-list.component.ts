import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ISession } from "../shared";

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html',
})
export class SessionListComponent implements OnChanges{
    @Input() sessions?: ISession[]
    @Input() filterBy!: string
    @Input() sortBy!: string
    visibleSessions?: ISession[] = []

    ngOnChanges(): void {
        if(this.sessions) {
            this.filterSessions(this.filterBy)
            this.sortBy === 'name' ? this.visibleSessions?.sort
                (sortByameAsc) : this.visibleSessions!.sort(sortByVotesDesc)
        }
    }

    filterSessions(filter: string) {
        if (filter === 'all') {
            this.visibleSessions = this.sessions?.slice(0)
        }
        else {
            this.visibleSessions = this.sessions?.filter(session => {
                return session.level.toLocaleLowerCase() === filter
            })
        }
    }
}

function sortByameAsc(s1: ISession, s2: ISession) {
    if(s1.name > s2.name) {
        return 1
    } 

    if(s1.name === s2.name) {
        return 0
    }

    return -1
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length
}