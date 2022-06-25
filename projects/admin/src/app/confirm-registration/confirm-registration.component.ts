import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetails } from "./FormDetails";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit {
  PageTitle;
  sub: any;
  id: string;
  userdetails: UserDetails[] = [new UserDetails()];
  datasource;
  showDetails = false;
  docID;
  notfound = false;
  loading = false;
  displayedColumns: string[] = ['Email', 'Total Fee', 'Pending Fee', 'Payment Status', 'Confirm Payment'];
  confirmRegistrationForm = new FormGroup({
    tokenid: new FormControl('', Validators.required)
  });

  constructor(private route: ActivatedRoute, private titleService: Title,
    private db: AngularFirestore, private ngxloader: NgxUiLoaderService) { }

  ngOnInit() {
    this.ngxloader.start();
    this.sub = this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.PageTitle = this.id;
      this.titleService.setTitle("LJKonnect - " + this.PageTitle);
      this.ngxloader.stop();
    });

  }

  confirmPayment() {
    this.db.collection("Events").doc(this.id).collection("Registered_Users").doc(this.docID)
      .update({ IsFeePaid: true, PendingFee: '0' });
    this.GetUserDetail();
  }

  GetUserDetail() {
    this.loading = true;
    if (this.confirmRegistrationForm.valid) {
      this.db.collection("Events").doc(this.id).collection("Registered_Users", ref => ref.where("TokenID", "==", this.confirmRegistrationForm.value.tokenid))
        .get().subscribe(data => {
          if (data.docs.length > 0) {
            this.docID = data.docs[0].id;
            this.userdetails[0].Email = data.docs[0].data().UserEmail;
            this.userdetails[0].TotalFee = data.docs[0].data().TotalFee;
            this.userdetails[0].isFeePaid = data.docs[0].data().IsFeePaid;
            this.userdetails[0].PendingFee = data.docs[0].data().PendingFee;
            this.datasource = this.userdetails;
            this.loading = false;
            this.showDetails = true;
            this.notfound = true;
          }
          else {
            this.notfound = false;
            this.loading = false;
          }
        })
    }
  }
}
