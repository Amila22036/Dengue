export interface IinvestigationSitesModel {
 id: number;
 phiId: string;
 phiName: string;
 startDate: string;
 endDate: string;
 assignedBy: string;
 siteName: string; 
 comments?: string;
 distance?: number;
 gpxData: string;
 role: string;
}