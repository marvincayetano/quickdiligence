// import { MyContext } from "../types";
import { Resolver, Query, Arg, Int, FieldResolver, Root } from "type-graphql";
import { Stock } from "../entities/Stock";
// import { getConnection } from "typeorm";

// @InputType()
// class StockInput {
//   @Field()
//   name: string;
//   @Field()
//   description: string;
//   @Field()
//   status: string;
//   @Field()
//   imgLink: string;
//   @Field()
//   animalType: string;
//   @Field()
//   gender: string;
//   @Field()
//   color: string;
//   @Field()
//   age: number;
// }

@Resolver(Stock)
export class StockResolver {
  @FieldResolver(() => String)
  descSnippet(@Root() root: Stock) {
    return root.description.slice(0, 50);
  }

  @Query(() => Stock, { nullable: true })
  animal(@Arg("id", () => Int) id: number): boolean | undefined {
    console.log(id);
    return true;
  }
}
