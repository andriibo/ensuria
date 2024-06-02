import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import {SettingsEntity} from 'domain/entities';
import {DecimalColumnTransformer} from "infrastructure/transformers";

@Entity('settings')
export class SettingsModel implements SettingsEntity {
  @PrimaryColumn({
    generated: 'uuid',
    type: 'uuid',
  })
  id: string;

  @Column({ type: 'decimal', precision: 6, scale: 2, transformer: new DecimalColumnTransformer() })
  commissionA: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, comment: 'in percents', transformer: new DecimalColumnTransformer() })
  commissionB: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, comment: 'in percents', transformer: new DecimalColumnTransformer() })
  blockingD: number;

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
