// EXECUTES IN A WEB WORKER
/* eslint-disable no-restricted-globals */
import { createBusLinkBackend, webWorkerBus } from "../../src";
import { createTestExecutor } from "../testSchema";

const backend = createBusLinkBackend({
  registerBus: webWorkerBus(self),
  createExecutor: createTestExecutor,
});

backend.listen();
