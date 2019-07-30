import { EmailValidator } from "@angular/forms";
import { Area } from "../../manage-areas/shared/area.model";

export class Investigation {
    $key:string;
    area  : string;
    area_gpx_name :string;
    name : string;
    // assigner : string;
    assigned_date: string;
    assigned_PHI: string;
    start_date: string;
    end_date: string;
    status: string;
    description: string;
}
