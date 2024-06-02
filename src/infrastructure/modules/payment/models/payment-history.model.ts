import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import {PaymentHistoryEntity} from 'domain/entities';
import {StatusEnum} from "domain/enums";
import {PaymentModel} from "infrastructure/modules/payment/models/payment.model";
import {DecimalColumnTransformer} from "infrastructure/transformers";

@Entity('payment_history')
@Unique(['paymentId', 'status'])
export class PaymentHistoryModel implements PaymentHistoryEntity {
  @PrimaryColumn({
    generated: 'uuid',
    type: 'uuid',
  })
  id: string;

  @Column('uuid', { name: 'payment_id' })
  paymentId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new DecimalColumnTransformer() })
  amount: number;

  @Column({ name: 'amount_blocked', type: 'decimal', precision: 10, scale: 2, default: 0, transformer: new DecimalColumnTransformer() })
  amountBlocked: number;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.New
  })
  status: StatusEnum;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @ManyToOne(() => PaymentModel, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'payment_id', referencedColumnName: 'id' })
  payment: PaymentModel;
}
