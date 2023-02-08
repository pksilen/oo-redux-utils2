import AbstractAction from './AbstractAction';
import type { ReduxActionObject } from './ReduxDispatch';

function createStateReducer<TState, TStateNamespace extends string>(
  initialState: TState,
  actionBaseClass: abstract new(...args: any[]) => AbstractAction<any, any>,
  stateNamespace: TStateNamespace
): (state: TState | undefined, reduxAction: ReduxActionObject) => TState {
  return function(currentState: TState = initialState, reduxAction: ReduxActionObject): TState {
    return (reduxAction.type instanceof actionBaseClass) &&
      reduxAction.type.getStateNamespace() === stateNamespace
      ? reduxAction.type.perform(currentState)
      : currentState;
  };
}

export default class OOReduxUtils {
  static mergeOwnAndForeignState<TOwnState extends Record<string, unknown>, TForeignState extends Record<string, unknown>>(
    ownState: TOwnState,
    foreignState: TForeignState
  ): TOwnState & TForeignState {
    const overlappingOwnAndForeignStateKeys = Object.keys(ownState).filter((ownStateKey: string) =>
      Object.keys(foreignState).includes(ownStateKey)
    );

    if (overlappingOwnAndForeignStateKeys.length > 0) {
      throw new Error('One or more overlapping properties in own and foreign state');
    }

    return {
      ...ownState,
      ...foreignState
    };
  }

  static createStateReducer<TState>(
    initialState: TState,
    actionBaseClasses: abstract new(...args: any[]) => AbstractAction<any, any>
  ): (state: TState | undefined, reduxAction: ReduxActionObject) => TState {
    return createStateReducer(initialState, actionBaseClasses, '');
  }

  static createNamespacedStateReducer<TState, TStateNamespace extends string>(
    initialState: TState,
    actionBaseClasses: abstract new(...args: any[]) => AbstractAction<any, any>,
    stateNamespace: TStateNamespace
  ): (state: TState | undefined, reduxAction: ReduxActionObject) => TState {
    return createStateReducer(initialState, actionBaseClasses, stateNamespace);
  }
}
