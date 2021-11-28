/* eslint-disable no-param-reassign */
import { BusLink, RegisterBusFunction } from "./core";
import {
  BusLinkRequestTypes,
  BusLinkResponseTypes,
  DefaultInitArgs,
} from "./types";

type PseudoBus<A> = {
  request: (message: BusLinkRequestTypes<A>) => void;
  response: (message: BusLinkResponseTypes) => void;
};

export const createPseudoBus = <A = DefaultInitArgs>(): PseudoBus<A> => ({
  request: () => {},
  response: () => {},
});

export const pseudoBus =
  <A = DefaultInitArgs>(bus: PseudoBus<A>): RegisterBusFunction<A> =>
  (onRequest) => {
    bus.request = (message) => {
      onRequest(message, (response) => {
        bus.response(response);
      });
    };
  };

export const createPseudoBusLink = <A = DefaultInitArgs>(
  bus: PseudoBus<A>
): BusLink<A> =>
  new BusLink({
    requestHandler: (request) => {
      bus.request(request);
    },
    registerResponseHandler: (responseHandler) => {
      bus.response = (response) => responseHandler(response);
    },
  });
