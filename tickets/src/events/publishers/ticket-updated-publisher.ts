
import { Publisher, Subjects, TicketUpdatedEvent } from '@app_tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;

}
