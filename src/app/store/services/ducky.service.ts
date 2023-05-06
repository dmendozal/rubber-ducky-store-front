import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";
import {Ducky} from "../interfaces/ducky.interface";


@Injectable({
  providedIn: 'root'
})
export class DuckyService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getDuckies(): Observable<Ducky[]> {
    return this.http.get<Ducky[]>(`${this.baseUrl}/api/duckies`);
  }

  getDuckyById(id: number): Observable<Ducky> {
    return this.http.get<Ducky>(`${this.baseUrl}/api/duckies/${id}`);
  }

  addDucky(ducky: Ducky): Observable<Ducky> {
    return this.http.post<Ducky>(`${this.baseUrl}/api/duckies`, ducky);
  }

  updateDucky(id: number, price?: number, quantity?: number): Observable<Ducky> {
    return this.http.put<Ducky>(`${this.baseUrl}/api/duckies`, {
      id,
      price,
      quantity
    })
  }

  deleteDucky(id?: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/duckies/${id}`);
  }
}
