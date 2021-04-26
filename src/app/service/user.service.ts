import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestModel } from '../models/login-request.model';
import { LoginResponseModel } from '../models/login-response.model';
import { MessageResponse } from '../models/message-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/start';

  constructor(
    private http: HttpClient
  ) { }

  activate(id: string) {
    return this.http.put<MessageResponse>(`${this.baseUrl}/activate/${id}`, {});
  }

  registration(request: User) {
    return this.http.post<any>(`${this.baseUrl}/signup`, request);
  }

  login(request: LoginRequestModel) {
    return this.http.post<LoginResponseModel>(`${this.baseUrl}/login`, request);
  }

}
