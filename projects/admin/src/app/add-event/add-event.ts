export class AddEvent {
    Event_Image_Link: string;
    Event_Name: string;
    Event_Description: string;
    Event_Disclaimer: string;
    Event_Start_Date: Date;
    Event_End_Date: Date;
    Event_Venue: string;
    Event_Year: Date;
    Registeration_Deadline_Date: Date;
    Organiser_ID: string;
    created_By: string;
    Event_Time_Stamp: Date;
    Is_Active: boolean;
    Is_Delete: boolean;
    Event_Time: string;
    Event_Type: string;
    Event_Team_Size_max: number = 1;
    Event_Team_Size_min: number = 1;
    Contains_SubEvent: string;
    SubEventCount: number = 0;
    HasRegistrationFee: boolean;
    RegistrationFee: number = 0;
    Updated_By: string;
    Updated_Date: Date;

    constructor() { }

    addData_addEvent(obj, name) {
        this.Event_Image_Link = obj.Event_Image_Link;
        this.Event_Name = obj.Event_Name;
        this.Event_Description = obj.Event_Description;
        this.Event_Disclaimer = obj.Event_Disclaimer;
        this.Event_Start_Date = new Date(obj.Event_Start_Date);
        this.Event_End_Date = new Date (obj.Event_End_Date);
        this.Event_Venue = obj.Event_Venue
        this.Event_Year = obj.Event_Year;
        this.Registeration_Deadline_Date = new Date (obj.Registration_Deadline_Date);
        this.Event_Type = obj.Event_Type;
        this.Event_Team_Size_max = obj.Event_Team_Size_max;
        this.Event_Team_Size_min = obj.Event_Team_Size_min;
        this.Organiser_ID = '';
        this.created_By = name;
        this.Event_Time_Stamp = new Date(Date());
        this.Event_Time = obj.Event_Time;
        this.Is_Active = true;
        this.Is_Delete = false;
        this.Contains_SubEvent = obj.Contains_SubEvent;
        this.HasRegistrationFee = obj.HasRegistrationFee;
        this.RegistrationFee = obj.RegistrationFee;
    }
}
