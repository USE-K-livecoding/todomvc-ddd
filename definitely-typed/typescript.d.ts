interface ObjectConstructor {
    entries<T extends Record<any, any>>(o: T): T extends Record<infer K, infer V> ? Array<[K, V]> : never;
}
