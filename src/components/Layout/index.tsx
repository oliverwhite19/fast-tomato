import type { ComponentChildren } from 'preact';
import { useStyles } from './index.style';

type Props = {
    children: ComponentChildren;
};

const Layout = ({ children }: Props) => {
    const { classes } = useStyles();
    return <div className={classes.layout}>{children}</div>;
};

export { Layout };
