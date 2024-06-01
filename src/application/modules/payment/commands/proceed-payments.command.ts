import { ICommand } from '@nestjs/cqrs';

export class ProceedPaymentsCommand implements ICommand {
  constructor(readonly paymentIds: string[]) {}
}
