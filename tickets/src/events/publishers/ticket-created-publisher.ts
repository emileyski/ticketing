import { Publisher, Subjects, TicketCreatedEvent } from "@emilevi4-co/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
