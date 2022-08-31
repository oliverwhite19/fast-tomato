import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { SunHigh, MoonStars } from 'tabler-icons-react';

const ThemeSwitch = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <ActionIcon
            variant="outline"
            onClick={() => toggleColorScheme()}
            color={dark ? undefined : 'dark'}
            size="lg"
            radius="xs"
        >
            {dark ? <SunHigh /> : <MoonStars />}
        </ActionIcon>
    );
};

export { ThemeSwitch };
