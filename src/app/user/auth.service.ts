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
                this.currentUser = data.user
                this.setUser(data.user)
            }))
            .pipe(catchError(err => {
                return of(false)
            }))
    }

    isAuthenticated() {
        return !!localStorage.getItem('accessToken');
    }

    updateCurrentUser(firstName:string, lastName:string):Observable<any> {
        const body = { firstName, lastName };
        const token = localStorage.getItem('accessToken');

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };

        return this.http.put<any>(`${this.server}/login/update`, body, { headers })
            .pipe(tap(data => {
                localStorage.removeItem('user')
                this.setUser(data.user)
            }))
            .pipe(catchError(err => {
                return of(false)
            }))
    }

    logout() {
        localStorage.removeItem('accessToken');
        this.router.navigate(['/events']);
    }

    setUser(user: IUser) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): IUser {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
      }
}