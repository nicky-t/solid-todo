import { For, createSignal } from "solid-js";

type Todo = {
  id: number;
  text: string;
  completed: () => boolean;
  setCompleted: (completed: boolean) => void;
};

const [todos, setTodos] = createSignal<Todo[]>([]);

const App = () => {
  let input: HTMLInputElement | undefined;
  let todoId = 0;

  const addTodo = (text: string) => {
    const [completed, setCompleted] = createSignal<boolean>(false);
    setTodos([...todos(), { id: ++todoId, text, completed, setCompleted }]);
  };
  const toggleTodo = (id: number) => {
    console.log(id);

    const index = todos().findIndex((t) => t.id === id);
    const todo = todos()[index];
    if (todo) todo.setCompleted(!todo.completed());
  };

  return (
    <>
      <Header />
      <div>
        <input ref={input} />
        <button
          onClick={(e) => {
            if (!input?.value.trim()) return;
            addTodo(input.value);
            input.value = "";
          }}
        >
          Add Todo
        </button>
      </div>
      <For each={todos()}>
        {(todo) => {
          const { id, text } = todo;
          console.log(`Creating ${text}`);
          return (
            <div>
              <input
                type="checkbox"
                checked={todo.completed()}
                onchange={[toggleTodo, id]}
              />
              <span
                style={{
                  "text-decoration": todo.completed() ? "line-through" : "none",
                }}
              >
                {text}
              </span>
            </div>
          );
        }}
      </For>
    </>
  );
};

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
        "justify-items": "center",
      }}
    >
      <h1>Todo List</h1>
      <p
        style={{
          height: "12px",
          "line-height": "12px",
          "text-align": "center",
          "margin-left": "20px",
        }}
      >
        todoCount: {todos().length}
      </p>
    </div>
  );
};
export default App;
