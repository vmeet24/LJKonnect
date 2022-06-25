export class AddAdmin {
   Login_ID: string;
   Password: string;
   Phone_Number: number;
   Added_Events: [];
   Parent_ID: string;
   Is_Active: boolean;

   constructor(value?){
      this.Login_ID =value.adminId
      this.Password = value.adminPassword
      this.Phone_Number = value.adminPhone
      this.Is_Active=true
      this.Added_Events=[]
      this.Parent_ID="" 
   }
}