import AbstractAction from "./AbstractAction";
import { Dispatch } from "./createActionDispatcher";
import { ReduxDispatch } from "./ReduxDispatch";

export default abstract class Controller<TStateNamespace extends string = ''> {
  protected readonly dispatch: Dispatch;
  // eslint-disable-next-line @typescript-eslint/ban-types
  private actionDispatchers: Record<string, Function> | undefined;

  constructor(reduxDispatch: ReduxDispatch) {
    this.dispatch = (action: AbstractAction<any, TStateNamespace>) => reduxDispatch({ type: action });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getState(...args: any[]): Record<string, unknown> {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getActionDispatchers(stateNamespace: TStateNamespace): Record<string, Function>;

  dispatchWithDi(
    ActionClass: abstract new (...args: any[]) => AbstractAction<any, TStateNamespace>,
    diContainer: { create: (...args: any[]) => Promise<any> },
    otherArgs: Record<string, unknown>
  ): void {
    diContainer
      .create(ActionClass, {
        dispatchAction: this.dispatch,
        ...otherArgs
      })
      .then((action: any) => this.dispatch(action));
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected cacheActionDispatchers(actionDispatchers: Record<string, Function>): Record<string, Function> {
    if (!this.actionDispatchers) {
      this.actionDispatchers = actionDispatchers;
    }

    return this.actionDispatchers;
  }
}
