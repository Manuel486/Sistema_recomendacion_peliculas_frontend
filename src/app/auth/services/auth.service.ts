import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Credentials } from '../interfaces/credentials.interface';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5000';
  private user?: User;

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      // Si hay un token y un usuario en el almacenamiento local, restaura el usuario.
      this.user = JSON.parse(storedUser);
    }
  }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user);
  }

  login(creds: Credentials): Observable<User> {
    return this.http.post(`${this.baseUrl}/auth/`, creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      this.user = response.body.user;
      localStorage.setItem('token', response.body.token);

      // Guarda el usuario en localStorage
      localStorage.setItem('user', JSON.stringify(this.user));

      return response.body;
    }))

  }

  registerUser(user: User): Observable<User | undefined> {
    return this.http
      .post<User>(`${this.baseUrl}/api/users/add`, user)
      .pipe(catchError((error) => of(undefined)))
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    this.user = undefined;

    // Elimina el token y el usuario del localStorage al cerrar sesión.
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
