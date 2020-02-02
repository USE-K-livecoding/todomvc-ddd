import ValueObject from "@/ddd-interface/ValueObject";
import { IsNotEmpty } from "class-validator";

export default class TodoTitle implements ValueObject<TodoTitle> {
    @IsNotEmpty()
    private value: string;

    public constructor(value?: string) {
        this.value = (value || "").trim();
    }
    public equals(other: TodoTitle): boolean {
        return this === other || this.value === other.value;
    }
    public toString() {
        return this.value;
    }
    public isEmpty() {
        return this.value.length === 0;
    }
}
