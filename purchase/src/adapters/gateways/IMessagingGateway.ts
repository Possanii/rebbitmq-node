import { Message, Replies } from 'amqplib';

export interface IMessagingGateway {
  initialize(): Promise<void>;
  publishInQueue(queue: string, message: string): Promise<Boolean>;
  publishInExchange(
    exchange: string,
    routingKey: string,
    message: string
  ): Promise<Boolean>;
  consume(
    queue: string,
    callback: (message: Message) => void
  ): Promise<Replies.Consume>;
}
