import type { Dispatch } from './DispatchUtils';
import AbstractAction from './AbstractAction';

export default abstract class AbstractDispatchingAction<TState, TStateNamespace extends string = ''> extends AbstractAction<TState, TStateNamespace> {
  constructor(stateNamespace: TStateNamespace, private readonly dispatch_: Dispatch) {
    super(stateNamespace);
  }

  dispatch(action: AbstractAction<TState, any>): void {
    this.dispatch_(action);
  }
}
