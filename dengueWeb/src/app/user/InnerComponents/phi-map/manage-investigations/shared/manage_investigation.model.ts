import { EmailValidator } from "@angular/forms";

export class User {
    $key:string;
    area  :string;
    complainer:string;
    assigner : string;
    route: string;
    assigned_date: string;
    assigned_PHI: string;
    start_date: string;
    end_date: string;
    expected_day_to_start_date: string;
    description: string;
    feedback: string;
}
