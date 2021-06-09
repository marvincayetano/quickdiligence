// import { MyContext } from "../types";
import {
  Resolver,
  Query,
  Arg,
  Int,
  FieldResolver,
  Root,
  InputType,
  Field,
} from "type-graphql";
import { Stock } from "../entities/Stock";
// import { getConnection } from "typeorm";

@InputType()
class StockInput {
  @Field()
  tickerId: string;
}

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
