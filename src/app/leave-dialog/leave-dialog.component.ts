import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CommonService, Student } from '../common.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-leave-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [NgFor,
    FormsModule, ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule],
  templateUrl: './leave-dialog.component.html',
  styleUrl: './leave-dialog.component.scss'
})
export class LeaveDialogComponent implements OnDestroy {
  dialogRef = inject(MatDialogRef<LeaveDialogComponent>)
  data = inject(MAT_DIALOG_DATA);
  cs = inject(CommonService);
  fb = inject(FormBuilder);
  leaveRequestForm!: FormGroup;
  students: Student[] = [];

  ngOnInit(): void {
    this.leaveRequestForm = this.fb.group({
      id: [this.data?.id, []],
      name: [this.data?.name, [Validators.required, Validators.minLength(3)]],
      class: [this.data?.class, [Validators.required]],
      section: [this.data?.section, [Validators.required]],
      reason: [this.data?.reason, [Validators.required]],
      fromDate: [this.data?.fromDate, [Validators.required]],
      toDate: [this.data?.toDate, [Validators.required]],
      status: [this.data?.status, [Validators.required]],
      leaveType: [this.data ? (this.data?.fromDate == this.data?.toDate) ? 'single' : 'multiple' : '', [Validators.required]]
    });
    this.change();
    if (this.data) this.leaveRequestForm.disable();
  }

  onSubmit(): void {
    if (this.leaveRequestForm.get('leaveType')?.value == 'single')
      this.leaveRequestForm.get('toDate')?.setValue(this.leaveRequestForm.get('fromDate')?.value);

    if (this.leaveRequestForm.disabled) this.dialogRef.close();
    else
      if (this.leaveRequestForm.valid) {
        if (!this.leaveRequestForm.disabled) this.dialogRef.close(this.leaveRequestForm.value)
      } else {
        this.leaveRequestForm.markAllAsTouched();
        this.cs.openSnackBar('Form is not valid');
      }
  }

  classes = ['X', 'XI', 'XII'];
  sections = ['A', 'B', 'C'];

  leaveType = 'Multiple';
  status = 'Unapproved';

  change() {
    this.students = this.cs.studentData.filter(ele => ele.class == this.leaveRequestForm.get('class')?.value && ele.section == this.leaveRequestForm.get('section')?.value);
    console.log('hgfgtd', this.leaveRequestForm.get('class')?.value, this.leaveRequestForm.get('section')?.value, this.students);
  }

  ngOnDestroy(): void {
    this.leaveRequestForm.reset();
  }
}
