import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@emilevi4-co/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
