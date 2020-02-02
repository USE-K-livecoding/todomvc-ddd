import TodoRepository from "@/domain/todo/TodoRepository";
import TodoTitle from "@/domain/todo/TodoTitle";

import { deserialize, serialize } from "class-transformer";
import TodoList from "@/domain/todo/TodoList";
import Todo from "@/domain/todo/Todo";
import TodoId from "@/domain/todo/TodoId";
import TodoStatus from "@/domain/todo/TodoStatus";

class TodoStorage implements TodoRepository {
    private name: string;

    public constructor(name: string) {
        this.name = name;
    }

    private store(list: TodoList): void {
        localStorage.setItem(
            this.name,
            serialize(list)
        );
    }

    private restore(): TodoList {
        const json = localStorage.getItem(this.name);
        if (json) {
            return deserialize(
                TodoList,
                json
            );
        }
        return new TodoList([
            new Todo(new TodoTitle("hoge")),
            new Todo(new TodoTitle("fuga")),
            new Todo(new TodoTitle("foo")),
            new Todo(new TodoTitle("baz")),
        ]);
    }

    public async list(): Promise<TodoList> {
        return this.restore();
    }

    public async add(title: TodoTitle): Promise<Todo> {
        const todoList = this.restore();

        const todo = new Todo(title);
        this.store(todoList.add(todo));

        return todo;
    }


    public async get(id: TodoId): Promise<Todo> {
        const currentList = this.restore();
        const todo = currentList.asList().find(item => item.id.equals(id));
        if (!todo) throw new Error();
        return todo;
    }

    public async remove(todo: Todo): Promise<void>;
    public async remove(todoList: TodoList): Promise<void>;
    public async remove(arg: Todo | TodoList): Promise<void>;
    public async remove(arg: Todo | TodoList): Promise<void> {
        const currentList = this.restore();
        const storedList = currentList.remove(arg);
        this.store(storedList);
    }

    public async changeTitle(id: TodoId, title: TodoTitle): Promise<void> {
        const currentList = this.restore().asList();
        this.store(
            new TodoList(currentList.map(
                (t) => {
                    if (t.id.equals(id)) t.title = title;
                    return t;
                }
            ))
        );
    }

    public async changeStatus(id: TodoId, status: TodoStatus): Promise<void> {
        const currentList = this.restore().asList();

        this.store(
            new TodoList(currentList.map(
                (t) => {
                    if (t.id.equals(id)) t.status = status;
                    return t;
                }
            ))
        );
    }

    public async changeStatusAll(status: TodoStatus): Promise<void> {
        const current = this.restore();
        this.store(current.changeStatus(status));
    }
}

export default TodoStorage;
