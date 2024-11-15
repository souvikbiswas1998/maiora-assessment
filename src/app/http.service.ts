import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  login({ email, password }: any) {
    return this.http.post('https://api.escuelajs.co/api/v1/auth/login', { email, password })
  }
}
