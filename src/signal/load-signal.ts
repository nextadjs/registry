import type { Runtime } from "@/types";

export const loadSignal = async (name: string, runtime: Runtime) => {
  // TODO: 適切なエラーハンドリング
  const Signal = (await import(`@signals/${name}/`)).default;
  // TODO: runtimeでエラースロー? 検討
  const config = await import(`@signals/${name}/signal.json`);
  return new Signal(config);
};
