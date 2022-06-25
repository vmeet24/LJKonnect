import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, } from '@angular/forms';
import { AngularFireAction } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogData } from '../core/DialogData';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Title } from '@angular/platform-browser';

export interface FieldTypeOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
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


export class DynamicFormComponent implements OnInit {
  PageTitle = "Add Event Form";
  fieldTypes: FieldTypeOptions[] = [
    { value: 'Text', viewValue: 'Text' },
    { value: 'Dropdown', viewValue: 'Dropdown' },
    { value: 'Radio', viewValue: 'Radio' },
    { value: 'CheckBox', viewValue: 'CheckBox' }
  ];
  dialogcfg = {} as DialogData;
  SelectedTypeDropdown: boolean[] = [false];
  SelectedTypeRadio: boolean[] = [false];
  SelectedTypeCheckBox: boolean[] = [false];
  dynamicForm: FormGroup;
  eventName: string;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private titleService: Title,
    private route: ActivatedRoute, private db: AngularFirestore,
    private router: Router, private dialog: MatDialog, private ngxLoader: NgxUiLoaderService, ) { }

  ngOnInit() {
    this.ngxLoader.start();
    this.titleService.setTitle("LJKonnect - " + this.PageTitle);
    this.route.paramMap.subscribe((data) => {
      this.eventName = data.get('id');
      this.ngxLoader.stop()
    })
    this.dynamicForm = new FormGroup({
      DyanmicFields: new FormArray([
        this.initDynamicField()
      ])
    })
  }

  initDynamicField() {
    return new FormGroup({
      FieldLabel: new FormControl(''),
      FieldType: new FormControl(''),
      FieldNumber: new FormControl(),
      isRequired: new FormControl(false),
      TypeOptions: new FormArray([
        this.initTypeOption()
      ])
    });
  }

  initTypeOption() {
    return new FormGroup({
      TypeOption: new FormControl('')
    })
  }

  addDynamicField() {
    const control = <FormArray>this.dynamicForm.get('DyanmicFields');
    control.push(this.initDynamicField());
  }
  addTypeOption(index) {
    const control = (<FormArray>this.dynamicForm.get('DyanmicFields')).controls[index].get('TypeOptions');
    (<FormArray>control).push(this.initTypeOption());
  }

  getDynamicField(form) {
    return form.controls.DyanmicFields.controls;
  }
  getTypeOption(form) {
    return form.controls.TypeOptions.controls;
  }
  dynamicFieldRemove(index) {
    const control = (<FormArray>this.dynamicForm.get('DyanmicFields'));
    control.removeAt(index);
    this.SelectedTypeDropdown.splice(index, 1);
    this.SelectedTypeRadio.splice(index, 1);
    this.SelectedTypeCheckBox.splice(index, 1);
  }
  removeDynamicField(index) {
    const control = (<FormArray>this.dynamicForm.get('DyanmicFields'));
    control.removeAt(index);
    this.SelectedTypeDropdown.splice(index, 1);
    this.SelectedTypeRadio.splice(index, 1);
    this.SelectedTypeCheckBox.splice(index, 1);
  }
  removeTypeOption(index) {
    const control = (<FormArray>this.dynamicForm.get('DyanmicFields')).controls[index].get('TypeOptions');
    (<FormArray>control).removeAt(index);
  }


  ResetOptions(index) {
    const TypeOptioncontrol = (<FormArray>(<FormArray>this.dynamicForm.get('DyanmicFields')).controls[index].get('TypeOptions'));

    for (let i = TypeOptioncontrol.length; i > 0; i--) {
      (<FormArray>TypeOptioncontrol).removeAt(i);
    }
  }

  selectChange(event, index) {
    if (event.value === 'Text') {
      this.SelectedTypeDropdown[index] = false;
      this.SelectedTypeRadio[index] = false;
      this.SelectedTypeCheckBox[index] = false;
      this.ResetOptions(index);
    }
    else if (event.value === 'Dropdown') {
      this.SelectedTypeDropdown[index] = true;
      this.SelectedTypeRadio[index] = false;
      this.SelectedTypeCheckBox[index] = false;
      this.ResetOptions(index);

    }
    else if (event.value === 'Radio') {
      this.SelectedTypeDropdown[index] = false;
      this.SelectedTypeRadio[index] = true;
      this.SelectedTypeCheckBox[index] = false;
      this.ResetOptions(index);
    }
    else if (event.value === 'CheckBox') {
      this.SelectedTypeDropdown[index] = false;
      this.SelectedTypeRadio[index] = false;
      this.SelectedTypeCheckBox[index] = true;
      this.ResetOptions(index);
    }
    // console.log(event.value);
  }


  dialogOpen() {
    this.dialogcfg.message = "Are you sure you want to Continue?";
    this.dialogcfg.type = "warning";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.height = "125px";
    dialogConfig.panelClass = "Custom-dialog";
    dialogConfig.data = this.dialogcfg;
    const dialogRef = this.dialog.open(DynamicDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.AddFormToDB();
      } else { }
    });
  }

  AddFormToDB() {
    this.dynamicForm.value.DyanmicFields.forEach(element => {
      this.db.collection('Events').doc(this.eventName).collection('Form-Fields').doc(element.FieldLabel).set({ ...element });
    });
    this._snackBar.open("Event Created Successfully", "Close", { duration: 1000, panelClass: ['event-add-success'] });
    this.router.navigate(['/admin/homepage']);
  }

  onSubmit() {

    let count = this.dynamicForm.value.DyanmicFields.length;
    for (let i = 0; i < count; i++) {
      (<FormGroup>this.dynamicForm.controls['DyanmicFields']).controls[i].patchValue({ FieldNumber: i + 1 });
    }
    if (this.dynamicForm.valid) {
      this.dialogOpen();
    }
    else {
      this._snackBar.open("Enter All Details Please", "Close", { duration: 1000, panelClass: ['event-add-success'] });
    }

  }

}

