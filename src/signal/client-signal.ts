import { ClientSignalSpecWrapper } from "./client-signal-spec-wrapper";
import { Signal } from "./signal";
import type { ClientAsyncCollect } from "./types";
import type { SignalSpecWrapper } from "./types/spec-wrapper";

export class ClientSignal extends Signal<ClientAsyncCollect> {
  public spec(): SignalSpecWrapper<ClientAsyncCollect, unknown> {
    return new ClientSignalSpecWrapper(this._userConfig, this._spec, this._data);
  }
}
