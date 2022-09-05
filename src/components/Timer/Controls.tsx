import { Button, Center, Space } from '@mantine/core';

type Props = {
    isRunning: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
    onModal: () => void;
    isInitial: boolean;
};

const Controls = ({
    onStart,
    onPause,
    onReset,
    onModal,
    isRunning,
    isInitial,
}: Props) => {
    return (
        <>
            <Space h="xl" />
            <Center>
                <Button.Group>
                    <Button
                        onClick={isRunning ? onPause : onStart}
                        variant="outline"
                        color="green"
                    >
                        {isRunning ? 'Pause' : 'Start'}
                    </Button>
                    <Button
                        onClick={onReset}
                        variant="outline"
                        color="red"
                        disabled={isInitial}
                    >
                        Reset
                    </Button>
                    <Button
                        onClick={onModal}
                        variant="outline"
                        color="orange"
                        disabled={isRunning}
                    >
                        Settings
                    </Button>
                </Button.Group>
            </Center>
            <Space h="xl" />
        </>
    );
};

export { Controls };
