import {z} from 'zod';
import EventEmitter from 'node:events';

const JoinRequest = z.object({
  username: z.string()
});

const ChatMessage = z.object({
  text: z.string()
});

const LeaveRequest = z.object({});

export const Packets = {
  JOIN_REQUEST: JoinRequest,
  CHAT_MESSAGE: ChatMessage,
  LEAVE_REQUEST: LeaveRequest
};

export type PacketsType = {
  [K in keyof typeof Packets]: z.TypeOf<typeof Packets[K]>;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface WebsocketProtocol {
  on<P extends keyof PacketsType>(
    p: P,
    handler: (payload: PacketsType[P]) => void | PromiseLike<void>
  ): this;
  emit<P extends keyof PacketsType>(
    p: P,
    payload: PacketsType[P]
  ): boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class WebsocketProtocol extends EventEmitter {
}
