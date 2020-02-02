import React from "react";
import TodoTitle from "@/domain/todo/TodoTitle";
import KeyboardEventKey from "@/frontend/keyboard-event-key";

interface TodoListHeaderViewProps {
    addTodo: (title: TodoTitle) => Promise<void>;
}
const TodoListHeaderView = (props: TodoListHeaderViewProps) => {
    const {
        addTodo,
    } = props;

    const handleNewTodoKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== KeyboardEventKey.Enter) {
            return false;
        }

        event.preventDefault();

        const input: HTMLInputElement = event.target as HTMLInputElement;
        const title = new TodoTitle(input.value);

        await addTodo(title);

        input.value = "";
        return;
    };
    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                onKeyDown={handleNewTodoKeyDown}
                autoFocus
            />
        </header>
    );
}

export default TodoListHeaderView;
