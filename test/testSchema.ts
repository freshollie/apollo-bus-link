import gql from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createSchemaExecutor } from "../src";

const schema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
      someList: [Int!]!
    }

    type Subscription {
      updatesOnList: Int!
    }
  `,
  resolvers: {
    Query: {
      someList: (
        _: unknown,
        __: unknown,
        context: { overrideResponse?: number[] }
      ) => context.overrideResponse ?? [1, 2, 3, 4],
    },
    Subscription: {
      updatesOnList: {
        resolve: (value) => value,
        async *subscribe() {
          // eslint-disable-next-line no-restricted-syntax
          for await (const val of [1, 2, 3, 4]) yield val + 1;
        },
      },
    },
  },
});

export type BackendArgs = {
  overrideResponse?: number[];
} | void;
export const createTestExecutor = (args: BackendArgs) =>
  createSchemaExecutor({
    schema,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    context: args?.overrideResponse
      ? () => ({ overrideResponse: args.overrideResponse })
      : () => ({}),
  });
