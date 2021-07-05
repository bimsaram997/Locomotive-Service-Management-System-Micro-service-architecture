import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css']
})
export class RejectDialogComponent implements OnInit {
  title: string;
  message: string;
  reason = '';
  constructor(public dialogRef: MatDialogRef<RejectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RejectDialogModel) {
    this.title = data.title;
    this.message = data.message;
  }
  onConfirm(): void {
    // Close the dialog, return true
    const val = this.reason.trim();
    //console.log(val);
    this.dialogRef.close(val);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
  ngOnInit(): void {
  }

}
export class RejectDialogModel {

  constructor(public title: string, public message: string, ) {
  }
}
