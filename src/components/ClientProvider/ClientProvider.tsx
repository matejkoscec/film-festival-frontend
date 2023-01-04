import React from "react";

import Client from "../../api/Client";

type ClientProviderProps = {
  children: React.ReactNode;
};

const ClientContext = React.createContext({
  client: Client.Default,
});

export default function ClientProvider({ children }: ClientProviderProps) {
  return <ClientContext.Provider value={{ client: new Client(true) }}>{children}</ClientContext.Provider>;
}

export function useClient() {
  return React.useContext(ClientContext);
}
