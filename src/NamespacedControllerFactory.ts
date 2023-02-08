// @flow

import type { ReduxDispatch } from './ReduxDispatch';
import DispatchUtils from './DispatchUtils';
import type { Dispatch } from './DispatchUtils';
import AbstractAction from './AbstractAction';

export default class NamespacedControllerFactory<StateNamespaceType: string> {
  dispatchAction: Dispatch;

  stateNamespace: StateNamespaceType;

  constructor(dispatch: ReduxDispatch, stateNamespace: StateNamespaceType) {
    this.dispatchAction = DispatchUtils.createActionDispatcher(dispatch);
    this.stateNamespace = stateNamespace;
  }

  dispatchActionWithDi(
    diContainer: { create: (...args: Array<any>) => any },
    actionClass: Class<AbstractAction<any, any>>,
    otherArgs: Object
  ) {
    diContainer
      .create(actionClass, {
        stateNamespace: this.stateNamespace,
        dispatchAction: this.dispatchAction,
        ...otherArgs
      })
      .then((action: any) => this.dispatchAction(action));
  }
}
