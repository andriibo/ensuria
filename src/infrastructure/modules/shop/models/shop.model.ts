import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import {ShopEntity} from 'domain/entities';
import {DecimalColumnTransformer} from "infrastructure/transformers";

@Entity('shop')
export class ShopModel implements ShopEntity {
  @PrimaryColumn({
    generated: 'uuid',
    type: 'uuid',
  })
  id: string;

  @Column({ type: 'varchar', unique: true, length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: new DecimalColumnTransformer() })
  balance: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, comment: 'in percents', transformer: new DecimalColumnTransformer() })
  commissionC: number;

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
}
