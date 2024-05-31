import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {PaymentEntity} from 'domain/entities';
import {StatusEnum} from "domain/enums";
import {ShopModel} from "infrastructure/modules/shop/models";

@Entity('payment')
export class PaymentModel implements PaymentEntity {
  @PrimaryColumn({
    generated: 'uuid',
    type: 'uuid',
  })
  id: string;

  @Column('uuid', { name: 'shop_id', nullable: false })
  shopId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

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
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shop_id', referencedColumnName: 'id' })
  shop: ShopModel;
}
