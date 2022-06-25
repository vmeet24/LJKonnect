export class userModel {
    Name: string;
    Phone: number;
    Branch: string;
    College: string;
    Email: string;
    Enrollment_Number: string;
    Semester: string;
    UserType: string;
    Gender: string;
    CreateDate: Date
    RegisteredEvents: any[] = []

    constructor() {
    }

    userData(data?) {


        // console.log("Before -> ",data);

        this.Name = data.Name
        this.Enrollment_Number = ""
        this.Phone = data.Phone
        this.Email = data.Email
        this.Branch = ""
        this.College = ""
        this.Semester = ""
        this.UserType = ""
        this.Gender = ""
        this.CreateDate = new Date(Date())
        if (data.RegisteredEvents)
            this.RegisteredEvents = data.RegisteredEvents
        else
            this.RegisteredEvents = []

        // console.log("After -> ", this);

    }

}