import { state, type State } from "poxi";

export type Todo = { completed: boolean; id: string; description: string };
type Schema = { todos: Array<Todo> };
export const getState = () => state<Schema>();
export const getTodos = () => getState().getArray("todos");

export function onCreate(state: State<Schema>) {
  state.set({
    todos: [{ description: "First todo", completed: true, id: "0" }],
  });
}
