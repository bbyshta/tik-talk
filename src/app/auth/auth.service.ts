import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  cookieService = inject(CookieService)
  authApiUrl = 'https://icherniakov.ru/yt-course/auth/'
  router = inject(Router)

  token: string | null = null
  refreshToken: string | null = null

  login(payload: {username: string, password: string}) {
    const formData = new FormData()

    formData.append('username', payload.username)
    formData.append('password', payload.password)

    return this.http.post<TokenResponse>(`${this.authApiUrl}token`, formData)
    .pipe(
      tap(val => this.saveTokens(val)),
    )
}

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      `${this.authApiUrl}refresh`,
      {refresh_token: this.refreshToken}
    ).pipe(
      tap(val => this.saveTokens(val)),
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )
  }

  logout() {
    this.cookieService.deleteAll()
    this.token = null
    this.refreshToken = null
    this.router.navigate(['/login'])
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token
    this.refreshToken = res.refresh_token

    this.cookieService.set('token', this.token)
    this.cookieService.set('refreshToken', this.refreshToken)
  }

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token')
      this.refreshToken = this.cookieService.get('refreshToken')
    }

    return !!this.token
  }
}
