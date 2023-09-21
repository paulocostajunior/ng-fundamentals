import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent {
    userName: any
    password: any
    loginInvalid = false

    constructor(private authService: AuthService, private router: Router) { 

    }

    login(formValues: any) {
        this.authService.loginUser(formValues.userName, formValues.password)
            .subscribe(resp => {
                if(!resp) {
                    this.loginInvalid = true
                } else {
                    this.router.navigate(['events'])
                }
            })

        this.router.navigate(['events'])
    }
}