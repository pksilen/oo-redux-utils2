export default abstract class AbstractAction<TState, TStateNamespace extends string = ''> {
  private readonly actionClassName: string;
  private readonly stateNamespace: TStateNamespace;

  constructor(stateNamespace: TStateNamespace) {
    this.stateNamespace = stateNamespace;
    this.actionClassName = this.constructor.name;
  }

  abstract perform(currentState: TState): TState

  performAction(
    action: AbstractAction<TState, TStateNamespace>,
    currentState: TState
  ): TState {
    return action.perform(currentState);
  }

  getStateNamespace(): string {
    return this.stateNamespace;
  }
}
