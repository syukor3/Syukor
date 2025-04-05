import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private jsonUrl = 'assets/general.json';
  constructor(private http: HttpClient) { }
  getProjectData(): Observable<any>{
    return this.http.get(this.jsonUrl);
  }
}
