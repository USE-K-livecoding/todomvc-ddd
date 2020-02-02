import React from "react";
import classNames from "classnames";
import Todo from "@/domain/todo/Todo";
import TodoStatus from "@/domain/todo/TodoStatus";
import TodoTitle from "@/domain/todo/TodoTitle";
import KeyboardEventKey from "@/frontend/keyboard-event-key";

interface TodoItemViewProps {
    todo: Todo;
    onDestroy: (todo: Todo) => Promise<void>;
    editing: boolean;
    onEdit: () => Promise<void>;
    onToggle: (status: TodoStatus) => Promise<void>;
    onSave: (title: TodoTitle) => Promise<void>;
    onCancel: () => Promise<void>;
}
const TodoItemView = (props: TodoItemViewProps) => {
    const {
        todo,
        onDestroy,
        editing,
        onEdit,
        onToggle,
        onSave,
        onCancel,
    } = props;

    const editField = React.useRef<HTMLInputElement>(null);
    const [title, setTitle] = React.useState(todo.title);

    const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = new TodoTitle(event.target.value);
        await onSave(newTitle);
        setTitle(newTitle);
        return;
    };
    return (
        <li
            className={classNames({
                completed: todo.status === TodoStatus.Complete,
                editing,
            })}
        >
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.status === TodoStatus.Complete}
                    onChange={async () => {
                        await onToggle(TodoStatus.toggle(todo.status));
                    }}
                />
                <label
                    onDoubleClick={async () => {
                        const node = editField.current;
                        await onEdit();
                        setTitle(todo.title);

                        if (node) {
                            node.focus();
                            node.setSelectionRange(node.value.length, node.value.length);
                        }

                    }}
                >
                    {String(todo.title)}
                </label>
                <button
                    className="destroy"
                    onClick={async () => {
                        await onDestroy(todo);
                    }}
                />
            </div>
            <input
                ref={editField}
                className="edit"
                value={String(title)}
                onBlur={handleSubmit}
                onChange={async (event) => {
                    const newTitle = new TodoTitle(event.target.value);
                    setTitle(newTitle);
                }}
                onKeyDown={async (event) => {
                    if (event.key === KeyboardEventKey.Escape) {
                        setTitle(todo.title);
                        await onCancel();
                        return;
                    }
                    if (event.key === KeyboardEventKey.Enter) {
                        await handleSubmit(event as unknown as React.ChangeEvent<HTMLInputElement>);
                        return;
                    }
                    return;
                }}
            />
        </li>
    )
};

export default TodoItemView;
