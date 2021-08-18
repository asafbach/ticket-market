import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@app_tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
