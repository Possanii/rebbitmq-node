import { injectable } from 'inversify';
import { ILogGateway } from '../interfaces/gateways/ILogGateaway';

@injectable()
export class ConsoleLogGateway implements ILogGateway {
  async log(logMessage: Record<string, unknown>): Promise<void> {
    console.log('Log Service:');
    console.log(JSON.stringify(logMessage, null, 2));
  }
}
