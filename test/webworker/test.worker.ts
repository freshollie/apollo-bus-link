// EXECUTES IN A WEB WORKER
/* eslint-disable no-restricted-globals */
import { createMessageBusLinkBackend, webWorkerBus } from "../../src";
import { createTestExecutor } from "../testSchema";

const backend = createMessageBusLinkBackend({
  registerBus: webWorkerBus(self),
  createExecutor: createTestExecutor,
});

backend.listen();
