export default interface ValueObject<T extends ValueObject<T>> {
    equals(other: T): boolean;
}
