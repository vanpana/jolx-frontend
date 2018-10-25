import { Injectable } from '@angular/core';
import {User} from '../models/user';

@Injectable()
export class CookiesService {
  isConsented = false;
  jwtKey = 'JWT';
  userKey = 'USER';

  constructor() {}

  /**
   * delete cookie
   * @param name
   */
  public deleteCookie(name) {
    this.setCookie(name, '', -1);
  }

  /**
   * get cookie
   * @param {string} name
   * @returns {string}
   */
  public getCookie(name: string) {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i  = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  /**
   * set cookie
   * @param {string} name
   * @param {string} value
   * @param {number} expireDays
   * @param {string} path
   */
  public setCookie(name: string, value: string, expireDays: number = 10, path: string = '') {
    const d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const cpath = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  /**
   * consent
   * @param {boolean} isConsent
   * @param e
   * @param {string} COOKIE
   * @param {string} EXPIRE_DAYS
   * @returns {boolean}
   */
  public consent(isConsent: boolean, e: any, COOKIE: string, EXPIRE_DAYS: number) {
    if (!isConsent) {
      return this.isConsented;
    } else if (isConsent) {
      this.setCookie(COOKIE, '1', EXPIRE_DAYS);
      this.isConsented = true;
      e.preventDefault();
    }
  }

  // Entity specific methods
  public saveUser(user: User) {
    this.setCookie(this.userKey, JSON.stringify(user));
  }

}
