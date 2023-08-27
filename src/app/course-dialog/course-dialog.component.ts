import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../model/course";

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  description: string;

  form = this.fb.group({
      description: [this.course.description, Validators.required],
      category: [this.course.category, Validators.required],
      releasedAt: [new Date(), Validators.required],
      longDescription: [this.course.longDescription, Validators.required],
    }
  )

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private course: Course, // This is important because here it say to the dialog what your data is.
              private dialogRef: MatDialogRef<CourseDialogComponent>
  ) {
  }


  ngOnInit() {
    this.description = this.course.description;
  }

  onClose() {
    this.dialogRef.close();
  };

  onSave() {
    this.dialogRef.close(this.form.value);
  };

}

// Dialog function.
export function openEditCourseDialog(dialog: MatDialog, course: Course) {

  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.enterAnimationDuration = 300;

  // This is for responsive designe, adding css classes to the dialog.
  config.panelClass = 'modal-panel';
  config.backdropClass = ''

  config.data = {
    ...course,
  };

  const dialogRef = dialog.open(CourseDialogComponent, config);

  return dialogRef.afterClosed();
}

