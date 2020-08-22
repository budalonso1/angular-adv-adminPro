import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';


import { environment } from '../../environments/environment.prod';

import { LoginInterfaces } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { resolve } from 'dns';

const base_url = environment.base_url;
declare const gapi: any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone ) {
    this.googleInit();
    }

  async googleInit(){

    // tslint:disable-next-line: no-shadowed-variable
    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '743564131063-rka6ef62hrvdmca165vk2sb63c2hsc39.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          });
        resolve();
        });
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.auth2 = gapi.auth2.getAuthInstance();
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });

  }
  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
     }).pipe(
       tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
       }),
       map( resp => true),
       catchError( error => of(false))
     );
  }

  crearUsuario( formData: RegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData)
                  .pipe(
                    tap( (resp: any) => {
                      localStorage.setItem('token', resp.token);
                    })
                  );
  }

  login( formData: LoginInterfaces){
    return this.http.post(`${base_url}/login`, formData)
                  .pipe(
                    tap( (resp: any) => {
                      localStorage.setItem('token', resp.token);
                    })
                  );
  }
  loginGoogle(token){
    return this.http.post(`${base_url}/login/google`, {token})
                  .pipe(
                    tap( (resp: any) => {
                      localStorage.setItem('token', resp.token);
                    })
                  );
  }
}

