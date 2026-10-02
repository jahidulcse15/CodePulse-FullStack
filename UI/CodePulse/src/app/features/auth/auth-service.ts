import { inject, Injectable, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { loginResponse, Register, User } from './model/auth-model';
import { HttpClient, HttpRequest, httpResource, HttpResourceRef, HttpResourceRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
    providedIn:'root',
})

export class AuthService {

    http=inject(HttpClient);
    router=inject(Router);

    user=signal<User|null>(null);

    loadUser():HttpResourceRef<User|undefined>{
        return httpResource<User>(()=>{
            const request:HttpResourceRequest={
                url:`${environment.apiUrl}/api/auth/me`,
                withCredentials:true
            }

            return request;
        });
    }

    login(email:string,password:string):Observable<loginResponse>{
       return this.http.post<loginResponse>(`${environment.apiUrl}/api/auth/login`,{

        email:email,
        password:password

        },{
           withCredentials:true
        }).pipe(
            tap((userResponse)=>this.setUser(userResponse))
        );
    }

    logout(){
        this.http.post<void>(`${environment.apiUrl}/api/auth/logout`,{},{
            withCredentials:true
        }).subscribe({
            next:()=>{
                this.setUser(null);
                this.router.navigate(['']);
            }
        })
    }

    setUser(updatedUser:User|null){
        if(updatedUser){
                this.user.set({
                email:updatedUser.email,
                roles:updatedUser.roles.map(r=>r.toLocaleLowerCase())
            })
        }
        else{
            this.user.set(null);
        }
    }


    register(request: Register) {
  return this.http.post(
    `${environment.apiUrl}/api/auth/register`,
    request,
    {
      withCredentials: true,
      responseType: 'text'
    }
  );
}
}
