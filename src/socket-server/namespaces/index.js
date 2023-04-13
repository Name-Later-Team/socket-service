import { registerDefaultEvents } from "./default/index.js";
import { registerPresentationEvents } from "./presentation/index.js";

const NamespaceRegistry = [
    { namespace: "/", handler: registerDefaultEvents },
    { namespace: "/presentation", handler: registerPresentationEvents },
];

export default NamespaceRegistry;
