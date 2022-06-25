export class TeamDetails {
    Team_Member_Name: string;
    Team_Member_Email: string;
    Team_Member_Phone: string;

    TeamDetails(data) {
        this.Team_Member_Name = data.Team_Member_Name;
        this.Team_Member_Email = data.Team_Member_Email;
        this.Team_Member_Phone = data.Team_Member_Phone;
    }
}