import { ApolloClient, gql, InMemoryCache } from "@apollo/client/core";
import {
  createPseudoBus,
  pseudoBus,
  createPseudoBusLink,
} from "../../src/pseudo";
import { createBusLinkBackend } from "../../src/core";
import { BackendArgs, createTestExecutor } from "../testSchema";

const bus = createPseudoBus<BackendArgs>();

const backend = createBusLinkBackend({
  registerBus: pseudoBus(bus),
  executor: createTestExecutor(),
});
backend.listen();

const link = createPseudoBusLink<BackendArgs>(bus);

describe("When using a pseudo bus", () => {
  it("should execute apollo queries", async () => {
    const client = new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });

    const { data } = await client.query({
      query: gql`
        query {
          someList
        }
      `,
    });
    expect(data.someList).toEqual([1, 2, 3, 4]);
  });
});
