import { ApolloClient, gql, InMemoryCache } from "@apollo/client/core";
// eslint-disable-next-line import/extensions
import TestWorker from "./test.worker.ts";
import { createBusWebWorkerLink } from "../../src";
import { BackendArgs } from "../testSchema";

const worker = new TestWorker();
const link = createBusWebWorkerLink<BackendArgs>(worker);

describe("When used in a web worker", () => {
  it("should execute apollo queries", async () => {
    await link.initialiseBackend();

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

  it("should use the init args to setup the backend in the required way", async () => {
    await link.initialiseBackend({ overrideResponse: [5, 6, 7, 8] });
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
    expect(data.someList).toEqual([5, 6, 7, 8]);
  });

  it("should handle subscriptions", async () => {
    await link.initialiseBackend();
    const client = new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });

    const result = client.subscribe({
      query: gql`
        subscription {
          updatesOnList
        }
      `,
    });
    const returnedData: number[] = [];
    await new Promise<void>((resolve) => {
      result.subscribe((res) => {
        returnedData.push(res.data.updatesOnList);
        if (returnedData.length > 3) {
          resolve();
        }
      });
    });
    expect(returnedData).toEqual([2, 3, 4, 5]);
  });
});
