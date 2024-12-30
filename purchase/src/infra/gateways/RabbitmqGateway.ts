import { ILogGateway } from '@/adapters/gateways/ILogGateaway';
import { IMessagingGateway } from '@/adapters/gateways/IMessagingGateway';
import { env } from '@/application/config/env';
import { TYPES } from '@/application/types';
import { Channel, connect, Connection, Message, Replies } from 'amqplib';
import { inject, injectable } from 'inversify';

@injectable()
export class RabbitmqGateway implements IMessagingGateway {
  private conn: Connection | null = null;
  private channel: Channel | null = null;

  public constructor(@inject(TYPES.Log) private log: ILogGateway) {}

  async initialize(): Promise<void> {
    if (!this.conn) {
      this.conn = await connect(env.MESSAGING_URL, function (error: Error) {
        if (error) {
          throw error;
        }
      });
    }

    if (!this.channel) {
      this.channel = await this.conn.createChannel();
    }

    this.log.log({ message: 'Rabbitmq connected!' });
  }

  async publishInQueue(queue: string, message: string): Promise<Boolean> {
    this.log.log({
      message:
        'Publishing in queue ' + queue + 'message: ' + JSON.stringify(message),
    });
    return this.channel!.sendToQueue(queue, Buffer.from(message));
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string
  ): Promise<boolean> {
    this.log.log({
      message: 'Publishing in exchange' + JSON.stringify(message),
    });
    return this.channel!.publish(exchange, routingKey, Buffer.from(message));
  }

  async consume(
    queue: string,
    callback: (message: Message) => void
  ): Promise<Replies.Consume> {
    this.log.log({ message: 'Consuming queue' + JSON.stringify(queue) });
    return this.channel!.consume(queue, (message) => {
      callback(message!);
      this.channel!.ack(message!);
    });
  }
}
