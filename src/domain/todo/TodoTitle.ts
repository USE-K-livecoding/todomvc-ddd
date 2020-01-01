import ValueObject from "@/ddd-interface/ValueObject";

export default class TodoTitle implements ValueObject<TodoTitle> {
    private value: string;

    public constructor(value: string) {
        this.value = value;
    }
    public equals(other: TodoTitle): boolean {
        return this === other || this.value === other.value;
    }
}
