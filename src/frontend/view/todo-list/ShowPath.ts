import ShowType from "./ShowType";

const ShowPath = (() => {
    const showPath: Record<ShowType, string> = {
        all: "/",
        active: "/active",
        completed: "/completed",
    };

    const types = Object.keys(showPath);
    const paths = Object.values(showPath);
    const entries = Object.entries(showPath);
    const allEntry: [ ShowType, string ] = [ "all", "/" ];

    return {
        ...showPath,
        paths: () => paths,
        types: () => types,
        toPath: (type: ShowType) => {
            const entry = entries.find(entry => type === entry[0]) || allEntry;
            return entry[1];
        },
        toType: (path: string) => {
            const entry = entries.find(entry => path === entry[1]) || allEntry;
            return entry[0];
        }
    }
})();

export default ShowPath;
