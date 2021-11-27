import BusLink from "./core/BusLink";
import { RegisterBusFunction } from "./core/BusLinkBackend";
import { DefaultInitArgs } from "./types";

export const webWorkerBus =
  <A = DefaultInitArgs>(
    workerSelf: typeof globalThis
  ): RegisterBusFunction<A> =>
  (request) => {
    // eslint-disable-next-line no-param-reassign
    workerSelf.onmessage = (event) =>
      request(event.data, (response) => workerSelf.postMessage(response));
  };

export const createWebWorkerBusLink = <A = DefaultInitArgs>(
  worker: Worker
): BusLink<A> =>
  new BusLink({
    requestHandler: (request) => worker.postMessage(request),
    registerResponseHandler: (handler) => {
      // eslint-disable-next-line no-param-reassign
      worker.onmessage = (event) => handler(event.data);
    },
  });
