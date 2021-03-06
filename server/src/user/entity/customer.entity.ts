import {
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  Column,
  RelationId,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';
import { CreditCard } from './credit-card.entity';
import { PlanType } from '../interface/plan.enum';

@Entity()
export class Customer {
  @OneToOne(type => User, user => user.customerInfo)
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  address: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @OneToMany(type => Vehicle, vehicle => vehicle.customer)
  vehicles: Vehicle[];

  @Column(type => CreditCard)
  creditCard: CreditCard;

  @Column({ type: 'enum', enum: PlanType, default: PlanType.BASIC })
  plan: PlanType;
}
