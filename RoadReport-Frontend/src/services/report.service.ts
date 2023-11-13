import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Report {
  title:string;
  content:string;
  latitude:number;
  longitude:number;
  userId:number;
}
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  protected userId: any;

  constructor(public httpClient: HttpClient) { }

  public getUserId(): any {
    return this.userId;
  }

  public setUserId(userId: any): void {
    this.userId = userId;
  }

  createReport(report: Report) {
    report.userId = this.getUserId();
    return this.httpClient.post<any>("http://localhost:3000/report/", report).pipe(
      tap(report => console.log(report)),
      map(report => report)
    )
  }

  getAllReports(): Observable<Report[]> {
    return this.httpClient.get<Report[]>("http://localhost:3000/report/").pipe(
      tap(data => console.log('All: ' + JSON.stringify(data)))
    );
  }
}
