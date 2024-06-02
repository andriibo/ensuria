import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import {ClientEntity} from 'domain/entities';
import {ShopModel} from "infrastructure/modules/shop/models";
import {DecimalColumnTransformer} from "infrastructure/transformers";

@Entity('client')
export class ClientModel implements ClientEntity {
  @PrimaryColumn({
    generated: 'uuid',
    type: 'uuid',
  })
  id: string;

  @Column('uuid', { name: 'shop_id' })
  shopId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: new DecimalColumnTransformer() })
  balance: number;

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

  @OneToOne(() => ShopModel, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shop_id', referencedColumnName: 'id' })
  shop: ShopModel;
}
