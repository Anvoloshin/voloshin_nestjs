import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'tasks', timestamps: true, underscored: true })
export class Task extends Model<Task> {
  @Column({ allowNull: false })
  name: string;

  @Column({ defaultValue: false })
  completed: boolean;
}
