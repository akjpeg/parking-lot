export interface ActitivyFormData {
    parkingLotActivity: number;
    parkingLotName: string;
    clientFirstName: string;
    clientLastName: string;
    vehiclePlateNumber: string;
}

export interface ActivityView {
    parkingLotActivityId: number;
    parkingLotId: number;
    parkingLotName: string;
    pricePerAdditionalHour: number;
    priceFirstHour: number;
    plateNumber: string;
    clientFirstName: string;
    clientLastName: string;
    startDate: Date;
    endDate: Date;
    parkingValue: number;
}