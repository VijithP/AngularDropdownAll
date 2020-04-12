import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatOption } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  type:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',type:'1'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',type:'2'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',type:'1'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',type:'1'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',type:'2'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',type:'3'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',type:'1'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',type:'3'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',type:'2'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',type:'2'},
];



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MaterialDropDown';

  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','type'];
  dataSource = ELEMENT_DATA;

  searchUserForm: FormGroup;

  userTypeFilters = [
    {
      key: '1', value: 'Value 1',
    },
    {
      key: '2', value: 'Value 2',
    },
    {
      key: '3', value: 'Value 3',
    },
    {
      key: '4', value: 'Value 4',
    }
  ];


  @ViewChild('allSelected',{static:false}) private allSelected: MatOption;

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.searchUserForm = this.fb.group({
      userType: new FormControl('')
    });
  }
  tosslePerOne(all){ 

    if (this.allSelected.selected) {  
     this.allSelected.deselect();
     this.FilterDataSource()
     return false;
     }
   if(this.searchUserForm.controls.userType.value.length==this.userTypeFilters.length)
   {
    this.allSelected.select();
   }
   this.FilterDataSource();

   
 }
   toggleAllSelection() {

     if (this.allSelected.selected) {
       this.searchUserForm.controls.userType
         .patchValue([...this.userTypeFilters.map(item => item.key), 0]);
     } else {
       this.searchUserForm.controls.userType.patchValue([]);
     }
     this.FilterDataSource();
   }

   FilterDataSource()
   {
     try{

           let searchValues=[];
           searchValues=this.searchUserForm.value.userType;
          this.dataSource = ELEMENT_DATA.filter(x => searchValues.includes(x.type))

     }catch(e)
     {

     }
   }
 


}
