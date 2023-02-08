import AbstractAction from './AbstractAction';
import type { ReduxDispatch } from './ReduxDispatch';

export type Dispatch = (action: AbstractAction<any, any>) => void;

export default class DispatchUtils {
  static createActionDispatcher(reduxDispatch: ReduxDispatch): Dispatch {
    return function(action: AbstractAction<any, any>) {
      reduxDispatch({ type: action });
    };
  }
}
