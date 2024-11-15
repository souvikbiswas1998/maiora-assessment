import { Component, inject, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { NgIf, NgFor, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LeaveDialogComponent } from '../leave-dialog/leave-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService, Student } from '../common.service';


/**
 * @title Adding and removing data when using an array-based datasource.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  dialog = inject(MatDialog);
  cs = inject(CommonService);
  displayedColumns: string[] = ["id", "name", "class", "section", "reason", "date", "status", "action"];
  dataSource = [...this.cs.studentData];

  @ViewChild(MatTable) table!: MatTable<Student>;


  addOrViewData(data?: any) {
    this.dialog.open(LeaveDialogComponent, {
      data: data,
      width: '80vw',
      maxWidth: '80vw',
      height: 'auto'
    }).afterClosed().subscribe(result => {
      if (result) this.cs.studentData.splice(0, 0, result);
      this.dataSource = [...this.cs.studentData];
    });
  }

  removeData(id: number) {
    let index = this.dataSource.findIndex(ele => ele.id == id)
    this.dataSource.splice(index, 1);
    this.table.renderRows();
  }
}
