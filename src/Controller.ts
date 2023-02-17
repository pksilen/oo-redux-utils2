import AbstractAction from './AbstractAction';
import { Dispatch } from './createActionDispatcher';
import { ReduxDispatch } from './ReduxDispatch';

export default abstract class Controller<TStateNamespace extends string = ''> {
  protected readonly dispatch: Dispatch;
  // eslint-disable-next-line @typescript-eslint/ban-types
  private cachedActionDispatchers: any | undefined;

  constructor(reduxDispatch: ReduxDispatch) {
    this.dispatch = (action: AbstractAction<any, TStateNamespace>) => reduxDispatch({ type: action });
  }

  dispatchWithDi(
    ActionClass: abstract new (...args: any[]) => AbstractAction<any, TStateNamespace>,
    diContainer: { create: (...args: any[]) => Promise<any> },
    otherArgs: Record<string, unknown>
  ): void {
    diContainer
      .create(ActionClass, {
        dispatchAction: this.dispatch,
        ...otherArgs,
      })
      .then((action: any) => this.dispatch(action));
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected getCachedActionDispatchers<T extends Record<string, Function>>(actionDispatchers: T): T {
    if (!this.cachedActionDispatchers) {
      this.cachedActionDispatchers = actionDispatchers;
    }

    return this.cachedActionDispatchers;
  }
}
