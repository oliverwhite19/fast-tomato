import {
    ColorScheme,
    ColorSchemeProvider,
    Group,
    MantineProvider,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Layout } from './components/Layout';
import { ThemeSwitch } from './components/ThemeSwitch/themeSwitch';
import { Times } from './components/Timer';
import { theme } from './styles';
import { PersistGate } from 'zustand-persist';

const App = () => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'dark',
    });
    const toggleColorScheme = (value?: ColorScheme) => {
        const newTheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', newTheme);
        setColorScheme(newTheme);
    };
    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{ ...{ colorScheme }, ...theme }}
                withGlobalStyles
                withNormalizeCSS
            >
                <PersistGate>
                    <Layout>
                        <Group position="right" spacing="xs">
                            <ThemeSwitch />
                        </Group>
                        <Times />
                    </Layout>
                </PersistGate>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export { App };
