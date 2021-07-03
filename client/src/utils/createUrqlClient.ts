import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import {
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from "urql";
import { pipe, tap } from "wonka";
import Router from "next/router";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/login");
        }
      })
    );
  };

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isInCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "animals"
    );
    info.partial = !isInCache;

    let hasMore = true;
    // Check if the data is in the cache
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "animals") as string[];
      const _hasMore = cache.resolve(key, "hasMore") as string[];
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }

      results.push(...data);
    });

    return {
      __typename: "PaginatedAnimals",
      hasMore: true,
      animals: results,
    };
  };
};

export const createUrqlClient = (ssrExchange: any, _: any) => {
  let cookie = "";

  return {
    url: "http://localhost:3000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined,
    },
    // Updates the cache when logins and registers
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedAnimals: () => null,
        },
        resolvers: {
          Query: {
            animals: cursorPagination(),
          },
        },
        updates: {
          Mutation: {},
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
