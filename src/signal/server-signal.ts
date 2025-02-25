import { ServerSignalSpecWrapper } from "./server-signal-spec-wrapper";
import { Signal } from "./signal";
import type { ServerAsyncCollect } from "./types";
import type { SignalSpecWrapper } from "./types/spec-wrapper";

export class ServerSignal extends Signal<ServerAsyncCollect> {
  public spec(): SignalSpecWrapper<ServerAsyncCollect, unknown> {
    return new ServerSignalSpecWrapper(
      this._userConfig,
      this._spec,
      this._data
    );
  }
}
