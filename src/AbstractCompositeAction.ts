import type { Dispatch } from './createActionDispatcher';
import AbstractAction from './AbstractAction';

export default abstract class AbstractCompositeAction<
  TState,
  TStateNamespace extends string = ''
> extends AbstractAction<TState, TStateNamespace> {
  protected constructor(stateNamespace: TStateNamespace, private readonly dispatch_: Dispatch) {
    super(stateNamespace);
  }

  dispatch(action: AbstractAction<any, any>): void {
    setTimeout(() => this.dispatch_(action), 0);
  }

  dispatchWithDi(
    ActionClass: abstract new (...args: any[]) => AbstractAction<any, any>,
    diContainer: { create: (...args: any[]) => Promise<any> },
    otherArgs: Record<string, unknown>
  ): void {
    setTimeout(
      () =>
        diContainer
          .create(ActionClass, {
            ...otherArgs,
          })
          .then((action: any) => this.dispatch(action)),
      0
    );
  }
}
