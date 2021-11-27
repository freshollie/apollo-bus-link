import type { IpcMain, IpcRenderer } from "electron";
import BusLink from "./core/BusLink";
import { RegisterBusFunction } from "./core/BusLinkBackend";
import { DefaultInitArgs } from "./types";

export const electronBus =
  <A = DefaultInitArgs>(
    ipc: IpcMain,
    channel = "graphql"
  ): RegisterBusFunction<A> =>
  (request) =>
    ipc.on(channel, (event, message) =>
      request(message, (response) => {
        // When testing this could be undefined (when its mocked)
        if (!(event.sender as Partial<typeof event.sender>).isDestroyed?.()) {
          event.sender.send(channel, response);
        }
      })
    );

export const createElectronBusLink = <A = DefaultInitArgs>(
  ipc: IpcRenderer,
  channel = "graphql"
): BusLink<A> =>
  new BusLink({
    requestHandler: (request) => {
      ipc.send(channel, request);
    },
    registerResponseHandler: (handler) => {
      ipc.on(channel, (_, response) => handler(response));
    },
  });
