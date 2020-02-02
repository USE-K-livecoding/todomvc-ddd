import React from "react";

interface IfTagProps {
    test: boolean;
    children: React.ComponentType<{ test?: boolean }>;
}
const IfTag = (props: IfTagProps) => {
    const {
        test,
        children: Component,
    } = props;
    return (
        <React.Fragment>
            { test ? <Component test={test} /> : null }
        </React.Fragment>
    );
}

export default IfTag;
