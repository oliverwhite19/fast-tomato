import { StateUpdater, useState } from 'preact/hooks';
import { Controls } from './Controls';
import { Timer } from './Timer';
import create from 'zustand';
import { configurePersist } from 'zustand-persist';
import { Settings } from './Settings';
import useSound from 'use-sound';
import basicAlarm from './basic-alarm.wav';

interface TimerState {
    focus: number;
    rounds: number;
    shortBreak: number;
    longBreak: number;
    setFocus: (focus: number) => void;
    setRounds: (rounds: number) => void;
    setShortBreak: (shortBreak: number) => void;
    setLongBreak: (longBreak: number) => void;
}

const { persist } = configurePersist({
    storage: localStorage,
    rootKey: 'timer',
});

const useTimerStore = create<TimerState>(
    // @ts-ignore
    persist(
        {
            key: 'auth',
        },
        // @ts-ignore
        (set) => ({
            focus: 5,
            rounds: 4,
            shortBreak: 5 * 60,
            longBreak: 15 * 60,
            // @ts-ignore
            setFocus: (focus: number) => set({ focus }),
            // @ts-ignore
            setRounds: (rounds: number) => set({ rounds }),
            // @ts-ignore
            setShortBreak: (shortBreak: number) => set({ shortBreak }),
            // @ts-ignore
            setLongBreak: (longBreak: number) => set({ longBreak }),
        })
    )
);

const Times = () => {
    const {
        focus,
        rounds,
        shortBreak,
        longBreak,
        setFocus,
        setRounds,
        setShortBreak,
        setLongBreak,
    } = useTimerStore();

    const [isRunning, setIsRunning] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);

    const [currentRound, setCurrentRound] = useState(1);
    const [currentPhase, setCurrentPhase] = useState<'focus' | 'break'>(
        'focus'
    );
    const [playFocus] = useSound(basicAlarm);
    const [playBreak] = useSound(basicAlarm);

    const onRoundEnd = (setCounter: StateUpdater<number>) => {
        if (currentPhase === 'break') {
            if (currentRound % rounds === 0) {
                setCurrentRound(1);
            } else {
                setCurrentRound(currentRound + 1);
            }
        }
        if (currentPhase === 'focus') {
            playFocus();
        } else {
            playBreak();
        }
        setCurrentPhase(currentPhase === 'focus' ? 'break' : 'focus');
        setCounter(() => {
            if (currentPhase !== 'focus') {
                return focus;
            } else {
                if (currentRound % rounds === 0) {
                    return longBreak;
                } else {
                    return shortBreak;
                }
            }
        });
    };

    return (
        <>
            <Controls
                isRunning={isRunning}
                isInitial={
                    currentRound === 1 && currentPhase === 'focus' && !isRunning
                }
                onStart={() => setIsRunning(true)}
                onPause={() => setIsRunning(false)}
                onReset={() => {
                    window.location.reload();
                }}
                onModal={() => setOpenSettings(true)}
            />
            <Timer
                initialTime={focus}
                onPhaseChange={onRoundEnd}
                isRunning={isRunning}
            />
            <Settings
                isOpen={openSettings}
                setClose={() => window.location.reload()}
                focus={focus}
                setFocus={setFocus}
                shortBreak={shortBreak}
                setShortBreak={setShortBreak}
                longBreak={longBreak}
                setLongBreak={setLongBreak}
            />
        </>
    );
};

export { Times };
