import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'Task', timestamps: true, underscored: true })
export class Task extends Model {
  @Column
  name: string;

  @Column({ defaultValue: false })
  completed: boolean;
}
