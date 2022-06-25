import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface DialogData {
  message: string;
  type: string;
}

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.css']
})
export class DynamicDialogComponent implements OnInit {
  dialog: DialogData;
  isConfirm = false;
  constructor(public dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.dialog = this.data;
    document.getElementById("message").classList.add(this.dialog.type.toString());
  }
  
  onNoClick(): void {
    this.dialogRef.close(this.isConfirm);
  }
  confirmEvent(){
    this.isConfirm = true;
    this.dialogRef.close(this.isConfirm);
  }
}
