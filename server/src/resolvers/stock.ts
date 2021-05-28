import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
  FieldResolver,
  Root,
  ObjectType,
} from "type-graphql";
import { Animal } from "../entities/Animal";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { LocatedAt } from "../entities/LocatedAt";

@InputType()
class AnimalInput {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  status: string;
  @Field()
  imgLink: string;
  @Field()
  animalType: string;
  @Field()
  gender: string;
  @Field()
  color: string;
  @Field()
  age: number;
}

@ObjectType()
class PaginatedAnimals {
  @Field(() => [Animal])
  animals: Animal[];
  @Field()
  hasMore: boolean;
}

const extractArgArr = (arg: String, argArr: String[] | number[] | null) => {
  // Loop that returns an SQL argument that extracts the array
  if (!argArr) return null;
  let args;

  if (typeof argArr[0] === "string") {
    args = argArr.map(
      (argument: any) => `${arg} LIKE '%${argument}%'` as const
    );
  } else {
    args = argArr.map((argument: any) => `${arg} = ${argument}` as const);
  }

  return args.join(" OR ");
};

@Resolver(Animal)
export class AnimalResolver {
  @FieldResolver(() => String)
  descSnippet(@Root() root: Animal) {
    return root.description.slice(0, 50);
  }

  @FieldResolver(() => User)
  creator(@Root() animal: Animal, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(animal.creatorId);
  }

  @FieldResolver(() => LocatedAt)
  locatedAt(@Root() animal: Animal, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(animal.locatedAtId);
  }

  @Query(() => PaginatedAnimals)
  async animals(
    @Arg("limit", () => Int) limit: number,
    // @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Arg("type", () => [String], { nullable: true }) type: [string] | null,
    @Arg("location", () => [Number], { nullable: true })
    location: [number] | null
  ): Promise<PaginatedAnimals> {
    const realLimit = Math.max(5, limit);
    const realLimitPlusOne = realLimit + 1;

    extractArgArr("animalType", new Array('"cat"', '"dog"'));
    const replacements: any[] = [realLimitPlusOne];

    console.log("LIMIT", realLimitPlusOne);

    // if (cursor) {
    //   console.log("CURSOR", cursor);
    //   replacements.push(new Date(parseInt(cursor)));
    // }

    const animalTypes = extractArgArr('LOWER( a."animalType")', type);
    const locations = extractArgArr('a."locatedAtId"', location);
    console.log(animalTypes);
    console.log(locations);

    const animals = await getConnection().query(
      `
        select a.*
        from animal a
        ${animalTypes ? `where (${animalTypes})` : ""}
        ${locations ? `${animalTypes ? " AND" : "where"} (${locations})` : ""}
        order by a."createdAt" DESC
        limit $1
        `,
      replacements
    );

    // const animals = await getConnection().query(
    //   `
    //     select a.*
    //     from animal a
    //     ${cursor ? `where a."createdAt" < $2` : ""}
    //     ${animalTypes ? ` AND ${animalTypes}` : ""}
    //     order by a."createdAt" DESC
    //     limit $1
    //     `,
    //   replacements
    // );

    // ${locations ? `AND (${locations})` : ""}

    // const qb = getConnection()
    //   .getRepository(Animal)
    //   .createQueryBuilder("animal")
    //   .innerJoinAndSelect(
    //     "animal.creator",
    //     "creator",
    //     'creator.id = animal."creatorId"'
    //   )
    //   .orderBy('animal."createdAt"', "DESC")
    //   .take(realLimitPlusOne);

    // const animals = await qb.getMany();

    return {
      animals: animals.slice(0, realLimit),
      hasMore: animals.length === realLimitPlusOne,
    };
  }

  @Query(() => Animal, { nullable: true })
  animal(@Arg("id", () => Int) id: number): Promise<Animal | undefined> {
    return Animal.findOne(id, { relations: ["creator", "located_at"] });
  }

  @Mutation(() => Animal)
  @UseMiddleware(isAuth)
  async createAnimal(
    @Arg("input") input: AnimalInput,
    @Ctx() { req }: MyContext
  ): Promise<Animal> {
    // TODO: Figure out how to use locatedAt when users post
    /***
        LocatedAtId 99 = Not Listed
    ***/
    console.log(input);
    return Animal.create({
      ...input,
      creatorId: req.session.userId,
      locatedAtId: 99,
    }).save();
  }

  @Mutation(() => Animal, { nullable: true })
  @UseMiddleware(isAuth)
  async updateAnimal(
    @Arg("id", () => Int) id: number,
    @Arg("name") name: string, // If you want something to be nullable
    @Arg("description") description: string, // If you want something to be nullable
    @Ctx() { req }: MyContext
  ): Promise<Animal | null> {
    const animal = await getConnection()
      .createQueryBuilder()
      .update(Animal)
      .set({ name, description })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    return animal.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteAnimal(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    try {
      const animal = await Animal.findOne(id);
      if (!animal) {
        return false;
      }

      if (animal.creatorId !== req.session.userId) {
        throw new Error("not authorized");
      }

      await Animal.delete({ id, creatorId: req.session.userId });
    } catch (err) {
      return false;
    }
    return true;
  }
}
