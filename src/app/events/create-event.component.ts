import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    template: `
        <h1></h1>
        <hr>
        <div class="col-md-6">
            <h3>this is gonna be a form</h3>
            <br/>
            <br/>
            <button type="submit" class="btn btn-primary">Save</button>
            <button (click)=cancel() type="button" class="btn btn-default">Cancel</button>
        </div>
    `
})
export class CreateEventComponent {
    isDirty: boolean = true

    constructor(private router: Router) {

    }

    cancel() {
        this.router.navigate(['/events'])
    }
}