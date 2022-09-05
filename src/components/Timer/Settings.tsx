import { Button, Center, Modal, Space, Tabs } from '@mantine/core';
import { Armchair2, Bed, Book } from 'tabler-icons-react';
import { TimeCounter } from '../TimeCounter/TimeCounter';

type Props = {
    isOpen: boolean;
    setClose: () => void;
    focus: number;
    setFocus: (time: number) => void;
    shortBreak: number;
    setShortBreak: (time: number) => void;
    longBreak: number;
    setLongBreak: (time: number) => void;
};

const Settings = ({
    isOpen,
    setClose,
    focus,
    setFocus,
    shortBreak,
    setShortBreak,
    longBreak,
    setLongBreak,
}: Props) => {
    return (
        <Modal
            opened={isOpen}
            onClose={setClose}
            title="Settings"
            padding={'xs'}
        >
            <Tabs defaultValue="focus" variant="outline" radius="xs">
                <Tabs.List>
                    <Tabs.Tab value="focus" icon={<Book size={12} />}>
                        Focus
                    </Tabs.Tab>
                    <Tabs.Tab value="short" icon={<Armchair2 size={12} />}>
                        Short Break
                    </Tabs.Tab>
                    <Tabs.Tab value="long" icon={<Bed size={12} />}>
                        Long Break
                    </Tabs.Tab>
                </Tabs.List>
                <Space h="xl" />

                <Tabs.Panel value="focus" pt="xs">
                    <Center>
                        <TimeCounter time={focus} setTime={setFocus} />
                    </Center>
                </Tabs.Panel>

                <Tabs.Panel value="short" pt="xs">
                    <Center>
                        <TimeCounter
                            time={shortBreak}
                            setTime={setShortBreak}
                        />
                    </Center>
                </Tabs.Panel>

                <Tabs.Panel value="long" pt="xs">
                    <Center>
                        <TimeCounter time={longBreak} setTime={setLongBreak} />
                    </Center>
                </Tabs.Panel>
            </Tabs>
            <Space h="xl" />
            <Center>
                <Button
                    onClick={() => {
                        setFocus(25 * 60);
                        setShortBreak(5 * 60);
                        setLongBreak(15 * 60);
                        setClose();
                    }}
                    variant="outline"
                    color="red"
                >
                    Reset Values
                </Button>
            </Center>
            <Space h="xl" />
        </Modal>
    );
};

export { Settings };
