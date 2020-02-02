import Todo from "./Todo";
import TodoStatus from "./TodoStatus";
import { Type } from "class-transformer";

class TodoList {
    @Type(() => Todo)
    private list: Array<Todo>;

    public constructor(list?: Array<Todo>) {
        this.list = list || [];
    }

    public asList(): ReadonlyArray<Todo> {
        return this.list.slice();
    }

    public add(todo: Todo): TodoList {
        return new TodoList(this.list.concat(todo));
    }

    public count(): number {
        return this.list.length;
    }

    public isEmpty(): boolean {
        return this.list.length === 0;
    }

    protected filteredList(status: TodoStatus): TodoList {
        return new TodoList(
            this.list.filter(
                todo => todo.status === status
            )
        );
    }
    public activeList(): TodoList {
        return this.filteredList(TodoStatus.Active);
    }

    public completeList(): TodoList {
        return this.filteredList(TodoStatus.Complete);
    }

    public changeStatus(status: TodoStatus): TodoList {
        return new TodoList(
            this.list.map((item) => {
                item.status = status;
                return item;
            })
        );
    }

    public remove(todo: Todo): TodoList;
    public remove(todoList: TodoList): TodoList;
    public remove(arg: Todo | TodoList): TodoList;
    public remove(arg: Todo | TodoList): TodoList {
        const removeTarget = arg instanceof Todo
            ? [arg]
            : arg.list;

        const list = this.list.filter(
            item => removeTarget.findIndex(
                x => x.identifiesWith(item)
            ) === -1
        );

        return new TodoList(list);
    }
}

export default TodoList;
