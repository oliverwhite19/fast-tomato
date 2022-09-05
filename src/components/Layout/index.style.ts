import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
    layout: {
        position: 'relative',
        maxWidth: '960px',
        width: '100%',
        minHeight: '100vh',
        margin: '0 auto',
        padding: '2rem 0 2rem 0',
        '@media (max-width: 1000px)': {
            padding: '2rem 1.3125rem 2rem 1.3125rem',
        },
    },
}));

export { useStyles };
