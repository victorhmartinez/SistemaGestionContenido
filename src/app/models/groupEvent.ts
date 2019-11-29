import { Group } from './group';
import { Event } from './event';

export class GroupEvent {

    group_event_id: number;
    event_id: Event;
    group_id: Group;
    

    constructor(group_event_id?: number, event_id?: Event,group_id?: Group){
        this.group_event_id = group_event_id,
        this.event_id = event_id,
        this.group_id = group_id
        
    }

}