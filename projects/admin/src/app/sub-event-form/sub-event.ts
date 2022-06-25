export class SubEvent {
    Event_Name: string;
    Event_Start_Date: Date;
    Event_End_Date: Date;
    Event_Venue: string;
    Event_Type: string;
    Event_Team_Size_max: number = 1;
    Event_Team_Size_min: number = 1;
    Is_Active: boolean;
    Is_Delete: boolean;
    Updated_By: string;
    Updated_Date: Date;
    HasRegistrationFee: boolean;
    RegistrationFee: number = 0;
}
