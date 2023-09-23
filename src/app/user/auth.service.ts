import { Injectable } from "@angular/core";
import { IUser } from "./user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { ILoginRequest } from "./loginRequest.model";

@Injectable()
export class AuthService {
    currentUser?: IUser;
    private options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    private server = "http://localhost:3000/api"

    constructor(private http: HttpClient, private router: Router) {}

    loginUser(userName: string, password: string):Observable<ILoginRequest | boolean>{
        let loginInfo = { userName: userName, password: password }

        return this.http.post<ILoginRequest>(`${this.server}/login`, loginInfo, this.options)
            .pipe(tap(data => {
                localStorage.setItem('accessToken', data.accessToken);
                this.setUser(data.user)
            }))
            .pipe(catchError(err => {
                return of(false)
            }))
    }

    isAuthenticated() {
        return !!localStorage.getItem('accessToken');
    }

    updateCurrentUser(firstName:string, lastName:string):Observable<IUser>{
        this.currentUser!.firstName = firstName
        this.currentUser!.lastName = lastName

        return this.http.put<IUser>(`/api/users/${this.currentUser!.id}`, this.currentUser, this.options)
    }

    // checkAuthenticationStatus() {
    //     console.log(this.currentUser?.firstName + ' lala')
    //     // this.http.get('api/currentIdentity')
    //     //     .pipe(tap(data => {
    //     //         if(data instanceof Object) {
    //     //             this.currentUser = <IUser>data
    //     //         }
    //     //     }))
    //     //     .subscribe()
    // }

    logout() {
        localStorage.removeItem('accessToken');
        this.router.navigate(['/login']);
    }

    setUser(user: IUser) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): IUser {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
      }
}