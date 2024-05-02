import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  apiUrl = environment.citiesApiUrl;

  constructor(private http: HttpClient) {}

  getCities() {
    return this.http.get(this.apiUrl + 'provinces');
  }

  getNeighborhoods(id: number) {
    return this.http.get(this.apiUrl + 'districts/' + id);
  }
}
