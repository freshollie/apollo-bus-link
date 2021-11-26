import { ApolloClient, gql, InMemoryCache } from "@apollo/client/core";
import createIPCMock from "electron-mock-ipc";
import {
  createElectronMessageBusLink,
  createMessageBusLinkBackend,
  electronBus,
} from "../../src";
import { BackendArgs, createTestExecutor } from "../testSchema";

const mockIpc = createIPCMock();

const backend = createMessageBusLinkBackend({
  registerBus: electronBus(mockIpc.ipcMain),
  createExecutor: createTestExecutor,
});
backend.listen();

const link = createElectronMessageBusLink<BackendArgs>(mockIpc.ipcRenderer);

describe("When used in electron", () => {
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
});
