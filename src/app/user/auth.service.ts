import { Injectable } from "@angular/core";
import { IUser } from "./user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, of, tap } from "rxjs";

@Injectable()
export class AuthService {
    currentUser?: IUser;
    options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    constructor(private http: HttpClient) {}

    loginUser(userName: string, password: string):Observable<IUser | boolean>{
        let loginInfo = { userName: userName, password: password }
        
        return this.http.post<IUser>('/api/login', loginInfo, this.options)
            .pipe(tap(data => {
                this.currentUser = data
            }))
            .pipe(catchError(err => {
                return of(false)
            }))
    }

    isAuthenticated() {
        return !!this.currentUser
    }

    updateCurrentUser(firstName:string, lastName:string):Observable<IUser>{
        this.currentUser!.firstName = firstName
        this.currentUser!.lastName = lastName

        return this.http.put<IUser>(`/api/users/${this.currentUser!.id}`, this.currentUser, this.options)
    }

    checkAuthenticationStatus() {
        this.http.get('api/currentIdentity')
            .pipe(tap(data => {
                if(data instanceof Object) {
                    this.currentUser = <IUser>data
                }
            }))
            .subscribe()
    }

    logout() {
        this.currentUser = undefined

        return this.http.post('/api/logout', {}, this.options)
    }
}