import AbstractAction from './AbstractAction';

export type ReduxActionObject = {
  readonly type: AbstractAction<any, any>
};

export type ReduxDispatch = (action: ReduxActionObject) => void;




