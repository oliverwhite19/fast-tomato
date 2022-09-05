import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { Center, Paper, RingProgress, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { screenSizes } from '../../styles';

type Props = {
    initialTime: number;
    onPhaseChange: (setCounter: StateUpdater<number>) => void;
    isRunning: boolean;
};

const Timer = ({ initialTime, onPhaseChange, isRunning }: Props) => {
    const [counter, setCounter] = useState(initialTime);
    const [startTime, setStartTime] = useState(initialTime);
    const isSmallScreen = useMediaQuery(
        `(max-width: ${screenSizes.largeMobile}px)`
    );

    useEffect(() => {
        if (!isRunning) {
            setCounter(initialTime);
        }
    }, [initialTime]);

    useEffect(() => {
        isRunning &&
            counter > 0 &&
            setTimeout(() => setCounter(counter - 1), 1000);
        if (counter === 0) {
            onPhaseChange((counter) => {
                setCounter(counter);
                setStartTime(counter);
            });
        }
    }, [counter, isRunning]);

    return (
        <Paper shadow="xs" radius="xs" p="xl" withBorder>
            <Center>
                <RingProgress
                    sections={[
                        { value: (100 / startTime) * counter },
                        {
                            value: 100 - (100 / startTime) * counter,
                            color: 'red',
                        },
                    ]}
                    size={isSmallScreen ? 200 : 500}
                    label={
                        <Text align={'center'}>
                            {Math.floor(counter / 60)}:
                            {(counter % 60).toString().padStart(2, '0')}
                        </Text>
                    }
                />
            </Center>
        </Paper>
    );
};

export { Timer };
