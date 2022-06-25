import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterResolver } from "./reguser.resolver";
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReadmoreService } from '../homepage/readmore.service';

@Component({
  selector: 'app-show-registered-user',
  templateUrl: './show-registered-user.component.html',
  styleUrls: ['./show-registered-user.component.css']
})
export class ShowRegisteredUserComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  PageTitle;
  regUsers;
  pendingFee: any;
  totalFee: any;
  FormFieldValue: any;
  FormFieldLabel: any;
  email: any;
  tokenID: any;
  isPaid: any;
  columndata = [{}];
  datas = [{}];
  hasSubEvent: boolean;
  // datasource = [{}];
  datasource = new MatTableDataSource();
  subEvents = [];
  id: any;
  hasRegisteredUser = false;
  constructor(private route: ActivatedRoute
    , private titleService: Title, private dialog: MatDialog,
    private _snackBar: MatSnackBar, private router: Router, private readmore: ReadmoreService
    , private ngxLoader: NgxUiLoaderService, ) { }


  columns = [''];

  ngOnInit() {
    this.ngxLoader.start();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.PageTitle = this.id;
      this.titleService.setTitle(this.PageTitle + ' - Registered Users')
    })
    this.route.data.subscribe(data => {
      if (data.length <= 0) {
        this.hasRegisteredUser = false;
      }
      this.regUsers = data.post;
    })
    this.initColumns();
    this.initDataSource();
    this.datasource = new MatTableDataSource(this.datas);
    this.ngxLoader.stop();

  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.datasource.filter = filterValue;
  }

  initDataSource() {

    let index = 0;
    let key;

    this.regUsers.forEach(element => {
      let data = element.data();
      let grp = {};
      for (key in data) {
        if (key === "TeamDetails") {
        }
        else if (key === "RegisteredSubEvents") {
          let ss = '';
          let len = data[key].length;
          data[key].forEach((element, i) => {
            if (i < len - 1) {
              ss += element['SubEventName'] + ';';
            }
            else {
              ss += element['SubEventName'];
            }
          });
          grp[key] = ss;
        }
        else {
          grp[key] = data[key];
        }
      }
      this.datas[index] = grp;
      // this.datasource[index] = grp;
      index++;
    });
  }
  initColumns() {
    let key;
    let i = 0;
    for (key in this.regUsers[0].data()) {
      let cols = {};
      let con = key;
      if (key === "RegisteredSubEvents") {
        this.columns[i] = key;
        cols['columnDef'] = key;
        cols['header'] = "Sub Events";
        cols['cell'] = (element: any) => `${element[con]}`;
      }
      else {
        this.columns[i] = key;
        cols['columnDef'] = key;
        cols['header'] = key;
        cols['cell'] = (element: any) => `${element[con]}`;
      }
      this.columndata[i] = cols;
      i++;
    }

  }

  isFeePaidCheck(fee) {
    if (fee === "true") {
      return true;
    }
    else {
      return false;
    }
  }
  downloadcsv() {
    this.readmore.ConvertToCSV(this.datasource.data, this.columns);
  }
  paymentColumncheck(column) {
    if (column === "IsFeePaid") {
      return true;
    }
    else {
      false
    }
  }

}
