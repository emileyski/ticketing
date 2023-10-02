import { Publisher, Subjects, TicketUpdatedEvent } from "@emilevi4-co/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
