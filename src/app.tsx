import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
    Text,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ThemeSwitch } from './components/ThemeSwitch/themeSwitch';
import { theme } from './styles';

const App = () => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'dark',
    });
    const toggleColorScheme = (value?: ColorScheme) => {
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
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
                <Text>Welcome to Mantine!</Text>
                <ThemeSwitch />
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export { App };
