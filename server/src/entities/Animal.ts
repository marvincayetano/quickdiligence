import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { LocatedAt } from "./LocatedAt";
import { User } from "./User";

@ObjectType()
@Entity()
export class Animal extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  imgLink!: string;

  @Field()
  @Column()
  animalType!: string;

  @Field()
  @Column()
  gender!: string;

  @Field()
  @Column()
  color!: string;

  @Field()
  @Column()
  age!: string;

  @Field()
  @Column()
  status!: string;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @Column()
  locatedAtId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.animals)
  creator: User;

  @Field()
  @ManyToOne(() => LocatedAt, (locatedAt) => locatedAt.animals)
  locatedAt: LocatedAt;

  @Field() // This exposes the field. Removing this hides this field in the schema
  @Column({ type: "text" })
  name!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
