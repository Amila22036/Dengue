import { EmailValidator } from "@angular/forms";

export class Area {
    $key:string;
    AreaName :string;
    AreaCode:string;
    GpxName: string;
    constructor(){
        this.$key = '';
        this.AreaName = '';
        this.AreaCode = '';
        this.GpxName = '';
    }
}
