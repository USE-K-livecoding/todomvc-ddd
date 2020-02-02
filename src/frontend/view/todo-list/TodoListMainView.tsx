import React from "react";
import TodoList from "@/domain/todo/TodoList";
import TodoItemView from "./TodoItemView";
import TodoStatus from "@/domain/todo/TodoStatus";
import Todo from "@/domain/todo/Todo";
import TodoId from "@/domain/todo/TodoId";
import TodoTitle from "@/domain/todo/TodoTitle";
import ShowType from "./ShowType";

interface TodoListMainViewProps {
    todoList: TodoList;
    nowShowing: ShowType;
    onToggle: (status: TodoStatus) => void;
    onChangeStatus: (id: TodoId, status: TodoStatus) => Promise<void>;
    onDestroy: (todo: Todo) => Promise<void>;
    onChangeTitle: (id: TodoId, title: TodoTitle) => Promise<void>;
}

const showList: Record<ShowType, (todoList: TodoList) => TodoList> = {
    all: (todoList) => todoList,
    active: (todoList) => todoList.activeList(),
    completed: (todoList) => todoList.completeList(),
}
const TodoListMainView = (props: TodoListMainViewProps) => {
    const {
        todoList,
        nowShowing,
        onToggle,
        onChangeStatus,
        onDestroy,
        onChangeTitle,
    } = props;

    const [editing, setEditing] = React.useState(TodoId.Nil);

    const showingList = showList[nowShowing](todoList);
    const activeList = todoList.activeList();

    if (todoList.isEmpty()) return null;
    return (
        <section className="main">
            <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                onChange={(event) => {
                    onToggle(
                        event.target.checked
                        ? TodoStatus.Active
                        : TodoStatus.Complete
                    );
                }}
                checked={activeList.isEmpty()}
            />
            <label htmlFor="toggle-all" >
                Mark all as complete
            </label>
            <ul className="todo-list">
                {showingList.asList().map((todo) => (
                    <TodoItemView
                        key={String(todo.id)}
                        todo={todo}
                        onToggle={async (status) => {
                            await onChangeStatus(todo.id, status);
                        }}
                        onDestroy={onDestroy}
                        onEdit={async () => setEditing(todo.id)}
                        editing={editing.equals(todo.id)}
                        onSave={async (title) => {
                            await onChangeTitle(todo.id, title);
                            setEditing(TodoId.Nil);
                        }}
                        onCancel={async () => setEditing(TodoId.Nil)}
                    />
                ))}
            </ul>
        </section>
    );
};

export default TodoListMainView;
