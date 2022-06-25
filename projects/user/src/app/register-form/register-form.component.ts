import { userModel } from './../core/user.model';
import { UserService } from './../core/user.service';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder, ValidationErrors } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(
        ':enter', [
        style({ height: 0, opacity: 0 }), animate('0.5s ease-out', style({ height: "*", opacity: 1 }))
      ]
      ),
      transition(
        ':leave', [
        style({ height: "*", opacity: 1 }), animate('0.5s ease-out', style({ height: 0, opacity: 0 }))
      ]
      ),
    ])
  ]
})
export class RegisterFormComponent implements OnInit {
  //done...
  PageTitle: string;
  formDetails: any[] = []
  RegisterForm: FormGroup;
  group = {};
  showInput: boolean[] = [false];
  subEvents: any[] = [];
  RegistrationFeeTotal: number = 0;
  subEventCount: number;
  uncheckedEvents: string[] = [];
  name;
  disableRegisterBtn = false;
  authData;
  userDataModel: userModel = new userModel()
  mainEvent;
  eventId;
  tokenID;
  email;
  constructor(private fb: FormBuilder, private ngxLoader: NgxUiLoaderService,
    private user: UserService, private route: ActivatedRoute, private _snackBar: MatSnackBar,
    private firestore: AngularFirestore, private router: Router, private titleService: Title, ) {

    this.ngxLoader.start();
    this.tokenID = this.genTokenID(5);

    this.route.paramMap.subscribe((name) => {
      this.name = name.get("id")
    });
    this.titleService.setTitle("LJKonnect - " + this.PageTitle);
    this.route.data.subscribe(data => {
      data['subevent'].forEach((element) => {
        this.subEvents.push(element.data())
      })
      data['form'].forEach((element) => {
        this.formDetails.push(element.data())
      })
      this.mainEvent = data["event"].data()
      route.paramMap.subscribe((id => {
        this.eventId = id.get("id");

      }))

    });
    this.PageTitle = this.name;
    this.titleService.setTitle("LJKonnect - " + this.PageTitle);
    this.formDetails.sort(this.dynamicSort("FieldNumber"));
    this.ngxLoader.stop();
  }

  ngOnInit() {
    //getting current user
    this.user.getCurrentUser().then(user => {
      this.authData = user;
      this.email = this.authData.email;
    })

    //getting Current user Data
    this.user.getCurrentUserData().then(data => {
      let res = this.userDataModel.userData(data)
    })


    //init formgroup start
    this.formDetails.forEach(elements => {
      if (elements.FieldType !== 'CheckBox') {
        this.group[elements.FieldLabel] = new FormControl('');
      }
      else {
        if (elements.isRequired) {
          this.group[elements.FieldLabel] = new FormControl('', Validators.requiredTrue);
        }
        else {
          this.group[elements.FieldLabel] = new FormControl('');
        }
      }
    })
    this.RegisterForm = new FormGroup(this.group);

    if (this.subEvents.length > 0) {
      this.initSubEventArray();
    }
    else {
      this.initMainEventDetail();
    }
    //init formgroup end

  }
  initMainEventDetail() {
    if (this.mainEvent.Event_Type === "TeamEvent") {
      this.RegisterForm.addControl('TeamDetails', new FormArray([]));
      const maxteamSize = this.mainEvent.Event_Team_Size_max - 1;
      const minteamSize = this.mainEvent.Event_Team_Size_min;
      for (let i = 0; i <= maxteamSize - 1; i++) {
        if (i < minteamSize - 1) {
          (<FormArray>this.RegisterForm.get('TeamDetails')).push(this.initRequiredTeamDeatailsGroup());
        }
        else {
          (<FormArray>this.RegisterForm.get('TeamDetails')).push(this.initNotRequiredTeamDeatailsGroup());
        }
      }
    }
    this.RegistrationFeeTotal = this.mainEvent.RegistrationFee;
  }
  isInputRequired(teamsize, count) {
    if (count < teamsize) {
      return true;
    }
    return false;
  }


  initRequiredTeamDeatailsGroup(): FormGroup {
    return this.fb.group({
      Team_Member_Name: ['', Validators.required],
      Team_Member_Email: ['', Validators.required],
      Team_Member_Phone: ['', Validators.required]
    })
  }

  initNotRequiredTeamDeatailsGroup(): FormGroup {
    return this.fb.group({
      Team_Member_Name: [''],
      Team_Member_Email: [''],
      Team_Member_Phone: ['']
    })
  }

  initSubEventArray() {
    this.RegisterForm.addControl('RegisteredSubEvents', new FormArray([]));

    this.subEvents.forEach((element, ind) => {
      (<FormArray>this.RegisterForm.get('RegisteredSubEvents')).push(new FormGroup({}));
      this.uncheckedEvents.push(element.Event_Name);
    });

    let num = ((<FormArray>this.RegisterForm.get('RegisteredSubEvents')).length);
    this.subEventCount = num;
    const control = (<FormArray>(<FormArray>this.RegisterForm.get('RegisteredSubEvents')));
    for (let i = 0; i < num; i++) {
      (<FormGroup>control.controls[i]).addControl('TeamDetails', new FormArray([]));
    }
    this.subEvents.forEach((element, index) => {
      let maxTeamsize = element.Event_Team_Size_max - 1;
      let minTeamsize = element.Event_Team_Size_min;
      (<FormGroup>control.controls[index]).addControl('SubEventName', new FormControl(element.Event_Name.toString()));
      for (let i = 0; i <= maxTeamsize - 1; i++) {
        if (i < minTeamsize - 1) {
          (<FormArray>(<FormGroup>control.controls[index]).get('TeamDetails')).push(this.initRequiredTeamDeatailsGroup());
        }
        else {
          (<FormArray>(<FormGroup>control.controls[index]).get('TeamDetails')).push(this.initNotRequiredTeamDeatailsGroup());
        }
      }
    });
  }


  getFormValidationErrors() {

    Object.keys(this.RegisterForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.RegisterForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.error('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }


  dynamicSort(property: string) {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder == -1) {
        return b[property].toString().localeCompare(a[property]);
      } else {
        return a[property].toString().localeCompare(b[property]);
      }
    }
  }

  getArrayfromNum(num: number) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(i);
    }
    return arr;
  }

  onSubEventCheckBoxChange(event, i, SubEvent) {

    if (event.checked) {
      document.getElementById('row-' + i).style.verticalAlign = "top";
      this.showInput[i] = true;
      this.spliceFromUncheckEvents(SubEvent.Event_Name);
      this.RegistrationFeeTotal += parseInt(SubEvent.RegistrationFee);
    }

    else {
      document.getElementById('row-' + i).style.verticalAlign = "inherit";
      this.uncheckedEvents.push(SubEvent.Event_Name);
      this.showInput[i] = false;
      this.RegistrationFeeTotal -= parseInt(SubEvent.RegistrationFee);
    }
  }

  spliceFromUncheckEvents(name) {
    var index = this.uncheckedEvents.indexOf(name);
    this.uncheckedEvents.splice(index, 1);
  }

  swipeSidebarToggle(event) {

    if (Math.abs(event.deltaX) > 40) {
      if (event.deltaX > 0) {
        document.querySelector('.sidebar').classList.add('sidebar-open');
        document.querySelector('.top-bar').classList.add('top-bar-shift');
        document.getElementById("overlay").style.display = "block";
      }
      else {
        document.querySelector('.sidebar').classList.remove('sidebar-open');
        document.querySelector('.top-bar').classList.remove('top-bar-shift');
        document.getElementById("overlay").style.display = "none";
      }
    }
  }

  remove(formgroup: FormGroup) {
    const regControl = ((<FormArray>this.RegisterForm.get('RegisteredSubEvents')));
    regControl.removeAt(regControl.controls.indexOf(formgroup));
  }


  genTokenID(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  RegisterUser() {
    this.disableRegisterBtn = true;
    if (this.subEventCount > 0) {
      if (this.subEventCount === this.uncheckedEvents.length) {
        this._snackBar.open("Please select One or more Sub Event/s!", "Close", { duration: 1200, panelClass: ['custom-snackbar'] });

      } else {
        const regControl = ((<FormArray>this.RegisterForm.get('RegisteredSubEvents')));
        for (var i = 0; i < this.uncheckedEvents.length; i++) {
          var reglength = regControl.length;

          for (var j = 0; j < reglength; j++) {
            var SubEvnetGroup = <FormGroup>regControl.controls[j];
            var SubEventControl = <FormGroup>regControl.controls[j].get('SubEventName');
            if (SubEventControl.value === this.uncheckedEvents[i]) {
              this.remove(SubEvnetGroup);
              reglength = regControl.length;
            }
          }
        }
      }
    }
    if (this.RegisterForm.valid) {
      this.RegisterForm.addControl('TotalFee', new FormControl(this.RegistrationFeeTotal));
      this.RegisterForm.addControl('PendingFee', new FormControl(this.RegistrationFeeTotal));
      this.RegisterForm.addControl('IsFeePaid', new FormControl(false));
      this.RegisterForm.addControl('TokenID', new FormControl(this.tokenID));
      this.RegisterForm.addControl('UserEmail', new FormControl(this.email));
      this.firestore.collection("Events").doc(this.name).collection("Registered_Users")
        .add(this.RegisterForm.value).then((ref) => {
          this.userDataModel.RegisteredEvents.push({ id: ref.id, Event: this.eventId })
          this.user.updateCurrentUser(this.userDataModel)
        });
      this.disableRegisterBtn = false;
      this._snackBar.open("Your Form has been saved successfully. Check your response in My Events", "Close", { duration: 1200, panelClass: ['custom-snackbar'] });
      this.router.navigate(['/event-detail', this.name]);
    }
    else {
      this.disableRegisterBtn = false;
      this.getFormValidationErrors();
      this._snackBar.open("Please fill all details!", "Close", { duration: 1200, panelClass: ['custom-snackbar'] });
    }
  }

}
