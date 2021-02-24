import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/start/signup';

  constructor(
    private http: HttpClient
  ) { }

  registration(request: User) {
    return this.http.post<User>(`${this.baseUrl}`, request);
  }

}
