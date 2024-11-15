import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface Student {
  id: number,
  name: string,
  class: string,
  section: string,
  reason: string,
  fromDate: Date,
  toDate: Date,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  setDate() {
    let date = new Date();
    date.setDate(Math.floor(Math.random() * 30))
    date.setMonth(Math.floor(Math.random() * 12))
    date.setHours(0, 0, 0, 0)
    return date;
  }
  studentData: Student[] = [
    {
      "id": 25143,
      "name": "Rajdeep Dutt",
      "class": "XII",
      "section": "C",
      "reason": "Fever",
      "fromDate": this.setDate(),
      "toDate": this.setDate(),
      "status": "Approved"
    },
    {
      "id": 25144,
      "name": "Ananya Mukherjee",
      "class": "XII",
      "section": "B",
      "reason": "Cold",
      "fromDate": this.setDate(),
      "toDate": this.setDate(),
      "status": "Approved"
    },
    {
      "id": 25145,
      "name": "Rohan Das",
      "class": "XI",
      "section": "A",
      "reason": "Headache",
      "fromDate": this.setDate(),
      "toDate": this.setDate(),
      "status": "Approved"
    },
    {
      "id": 25146,
      "name": "Sonal Gupta",
      "class": "XII",
      "section": "D",
      "reason": "Stomach Ache",
      "fromDate": this.setDate(),
      "toDate": this.setDate(),
      "status": "Approved"
    },
    {
      "id": 25147,
      "name": "Amit Roy",
      "class": "X",
      "section": "E",
      "reason": "Cough",
      "fromDate": this.setDate(),
      "toDate": this.setDate(),
      "status": "Approved"
    },
    {
      "id": 25148,
      "name": "Priya Singh",
      "class": "XII",
      "section": "C",
      "reason": "Injury",
      "fromDate": this.setDate(),
      "toDate": this.setDate(),
      "status": "Approved"
    },
    {
      "id": 25149,
      "name": "Rahul Verma",
      "class": "XI",
      "section": "F",
      "reason": "Migraine",
      "fromDate": this.setDate(),
      "toDate": this.setDate(),
      "status": "Approved"
    },
    {
      "id": 25150,
      "name": "Anjali Sharma",
      "class": "XII",
      "section": "B",
      "reason": "Chickenpox",
      "fromDate": this.setDate(),
      "toDate": this.setDate(),
      "status": "Approved"
    },
    {
      "id": 25151,
      "name": "Karan Mehta",
      "class": "X",
      "section": "A",
      "reason": "Fracture",
      "fromDate": this.setDate(),
      "toDate": this.setDate(),
      "status": "Approved"
    },
    {
      "id": 25152,
      "name": "Neha Agarwal",
      "class": "XII",
      "section": "C",
      "reason": "Typhoid",
      "fromDate": this.setDate(),
      "toDate": this.setDate(),
      "status": "Approved"
    }
  ];

  private _snackBar = inject(MatSnackBar);

  constructor() { }

  openSnackBar(message: string, action: string = 'Close') {
    this._snackBar.open(message, action);
  }
}
