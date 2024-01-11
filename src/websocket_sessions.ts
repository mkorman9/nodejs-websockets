import ws from 'ws';
import {uuidv4} from 'uuidv7';

export type WebsocketSession = {
  id: string;
  socket: ws;
  username: string;
};

const websocketIDs = new Set<string>();
const activeSessions = new Map<string, WebsocketSession>();

export function generateWebsocketId() {
  let id = '';
  do {
    id = uuidv4();
  } while (websocketIDs.has(id));

  websocketIDs.add(id);
  return id;
}

export function startWebsocketSession(
  id: string,
  socket: ws,
  username: string
): WebsocketSession | undefined {
  if (activeSessions.has(id)) {
    return undefined;
  }
  if (websocketSessions().find(s => s.username === username)) {
    return undefined;
  }

  const user: WebsocketSession = {
    id,
    socket,
    username
  };
  activeSessions.set(id, user);
  return user;
}

export function stopWebsocketSession(id: string) {
  activeSessions.delete(id);
  websocketIDs.delete(id);
}

export function websocketSessions() {
  return [...activeSessions.values()];
}

export function websocketSession(id: string) {
  return activeSessions.get(id);
}

export function sendWebsocketMessage(socket: ws, type: string, data: unknown) {
  socket.send(JSON.stringify({
    type,
    data
  }));
}
