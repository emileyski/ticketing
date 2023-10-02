import { Publisher, OrderCreatedEvent, Subjects } from "@emilevi4-co/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
