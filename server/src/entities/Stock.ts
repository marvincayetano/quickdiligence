import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Stock extends BaseEntity {
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
