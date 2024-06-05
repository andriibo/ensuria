import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import {PaymentEntity} from 'domain/entities';
import {StatusEnum} from "domain/enums";
import {ShopModel} from "infrastructure/modules/shop/models";
import {PaymentHistoryModel} from "infrastructure/modules/payment/models/payment-history.model";
import {DecimalColumnTransformer} from "infrastructure/transformers";

@Entity('payment')
export class PaymentModel implements PaymentEntity {
  @PrimaryColumn({
    generated: 'uuid',
    type: 'uuid',
  })
  id: string;

  @Column('uuid', { name: 'shop_id' })
  shopId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new DecimalColumnTransformer() })
  amount: number;

  @Index()
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

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @ManyToOne(() => ShopModel, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'shop_id', referencedColumnName: 'id' })
  shop: ShopModel;

  @OneToMany(() => PaymentHistoryModel, (paymentHistory) => paymentHistory.payment)
  @JoinColumn({ name: 'shop_id', referencedColumnName: 'id' })
  paymentHistory: PaymentHistoryModel[];
}
