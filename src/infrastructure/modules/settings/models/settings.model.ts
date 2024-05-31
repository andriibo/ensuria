import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import {SettingsEntity} from 'domain/entities';

@Entity('settings')
export class SettingsModel implements SettingsEntity {
  @PrimaryColumn({
    generated: 'uuid',
    type: 'uuid',
  })
  id: string;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  commissionA: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, comment: 'in percents' })
  commissionB: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, comment: 'in percents' })
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
