import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface DialogData {
  message: string;
  type: string;
}


@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent implements OnInit {
  dialog: DialogData;
  isConfirm = false;
  constructor(public dialogRef: MatDialogRef<DialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.dialog = this.data;
    document.getElementById("message").classList.add(this.dialog.type.toString());
  }

  onNoClick(): void {
    this.dialogRef.close(this.isConfirm);
  }
  confirmEvent() {
    this.isConfirm = true;
    this.dialogRef.close(this.isConfirm);
  }
}
