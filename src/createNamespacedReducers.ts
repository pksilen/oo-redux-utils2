import { ReduxActionObject } from "./ReduxDispatch";

type Reducers<TStateNamespaces extends Record<string, string>, TState> = {
  [K in keyof TStateNamespaces]: (state: TState | undefined, reduxActionObject: ReduxActionObject) => TState;
};

export function createNamespacedReducers<TStateNamespaces extends Record<string, string>, TState>(
  stateNamespaces: TStateNamespaces,
  createNamespacedStateReducer: (
    key: keyof TStateNamespaces
  ) => (state: TState | undefined, reduxActionObject: ReduxActionObject) => TState
): Reducers<TStateNamespaces, TState> {
  return Object.keys(stateNamespaces).reduce((accumulatedReducers, stateNamespace) => ({
      ...accumulatedReducers,
      [stateNamespace]: createNamespacedStateReducer(stateNamespace)
    }),
    {} as Reducers<TStateNamespaces, TState>
  );
}
