import { Subjects, Publisher, OrderCancelledEvent } from "@emilevi4-co/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
