import { ActionIcon, Group, Paper, Text } from '@mantine/core';
import { Minus, Plus } from 'tabler-icons-react';

type Props = {
    time: number;
    setTime: (time: number) => void;
};

const TimeCounter = ({ time, setTime }: Props) => {
    return (
        <div>
            <Group spacing={5}>
                <ActionIcon
                    size="xl"
                    radius="xs"
                    variant="outline"
                    onClick={() => setTime(time - 60)}
                >
                    <Minus size={60} strokeWidth={2} />
                </ActionIcon>
                <Paper shadow="xs" radius="xs" p="xs" withBorder>
                    <Text>{time / 60}:00</Text>
                </Paper>

                <ActionIcon
                    size="xl"
                    radius="xs"
                    variant="outline"
                    onClick={() => setTime(time + 60)}
                >
                    <Plus size={60} strokeWidth={2} />
                </ActionIcon>
            </Group>
        </div>
    );
};

export { TimeCounter };
