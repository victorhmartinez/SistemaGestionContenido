import { Content } from './content';

export class Event {

    event_id: number;
    place: string;
    link_form: string;
    url_info:string;
    content_id: Content;
    

    constructor(event_id?: number,place?: string, link_form?:string,
                    url_info?: string, content_id?: Content){

        this.event_id = event_id,
        this.place = place,
        this.link_form = link_form,
        this.url_info = url_info,
        this.content_id = content_id
        
    }

}