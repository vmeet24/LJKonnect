import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeamDetails } from '../core/teamDetails';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  isPaid: boolean = false;
  email: any;

  constructor(public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  temp;
  FormFieldLabel: string[] = [''];
  FormFieldValue: string[] = [''];
  TeamDetail: TeamDetails[] = [new TeamDetails()];
  hasSubEvent: boolean = false;
  isTeamEvent: boolean = false;
  subEvent: any[] = [];
  isConfirm = false;
  tokenID;
  pendingFee;
  totalFee;
  isSubEventTypeTeam: boolean[] = [false];
  ngOnInit() {
    var key;
    var index = 0;
    for (key in this.data.data) {
      if (key === "TeamDetails") {
        this.hasSubEvent = false;
        this.initTeamDetails(this.data.data[key]);
      }
      else if (key === 'PendingFee') {
        this.pendingFee = this.data.data[key];
      }
      else if (key === 'TotalFee') {
        this.totalFee = this.data.data[key];
      }
      else if (key === "RegisteredSubEvents") {
        this.hasSubEvent = true;
        this.data.data[key].forEach((element, index) => {
          this.subEvent[index] = element;
          if (element.TeamDetails) {
            if (element.TeamDetails.length > 0) {
              this.isSubEventTypeTeam[index] = true;
            }
          }
          else {
            this.isSubEventTypeTeam[index] = false;
          }
        });
      } else if (key === "TokenID") {
        this.tokenID = this.data.data[key];
      }
      else if (key === "IsFeePaid") {
        this.isPaid = this.data.data[key];
      }
      else if (key === "UserEmail") {
        this.email = this.data.data[key];
      }
      else {
        this.FormFieldLabel[index] = key;
        this.FormFieldValue[index] = this.data.data[key];
        index++;
      }
    }

    if (this.TeamDetail.length < 2) { }
    else {
      this.isTeamEvent = true;
    }
  }
  initTeamDetails(array) {
    array.forEach((element, index) => {
      this.TeamDetail[index] = element;
    });
  }

  emptyTeamDetail(details) {
    if (details.Team_Member_Name) {
      return true;
    }
    else {
      return false;
    }
  }
  onNoClick(): void {
    this.dialogRef.close(this.isConfirm);
  }
}
