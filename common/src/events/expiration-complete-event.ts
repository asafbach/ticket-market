import {Subjects} from './subjects';
export interface ExpirationCompleteEvent{
    readonly subject : Subjects.ExpirationComplete;
    data :{
        orderId : string;
    }
    
}