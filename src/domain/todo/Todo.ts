import Entity from "@/ddd-interface/Entity";
import TodoId from "./TodoId";
import TodoTitle from "./TodoTitle";
import TodoStatus from "./TodoStatus";
import { Type } from "class-transformer";

export default class Todo implements Entity<Todo> {
    @Type(() => TodoId)
    public readonly id: TodoId;

    @Type(() => TodoTitle)
    public title: TodoTitle;

    public status: TodoStatus = TodoStatus.Active;

    public constructor();
    public constructor(title: TodoTitle);
    public constructor(id: TodoId, title: TodoTitle);
    public constructor(...args: [] | [TodoTitle] | [TodoId, TodoTitle]) {
        if (args.length === 0) {
            this.id = new TodoId();
            this.title = new TodoTitle("");
            return;
        }

        if (args.length === 1) {
            const [title] = args;
            this.id = new TodoId();
            this.title = title;
            return;
        }

        if (args.length === 2) {
            const [id, title] = args;
            this.id = id;
            this.title = title;
            return;
        }

        throw new TypeError("constructor arguments");
    }

    public identifiesWith(other: Todo): boolean {
        return this === other || this.id.equals(other.id);
    }
}
