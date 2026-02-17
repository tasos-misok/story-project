import { useState } from 'react';
import type { StoryData } from '../types/story.ts';
import storyData from '../story/story.json';
import usePersistedState, { clearPersistedState } from '../hooks/usePersistedState.ts';
import styles from './StoryPlayer.module.css';
import TitleScreen from './TitleScreen.tsx';
import StoryNode from './StoryNode.tsx';
import ChoiceList from './ChoiceList.tsx';
import EndingScreen from './EndingScreen.tsx';
import ErrorScreen from './ErrorScreen.tsx';

const story = storyData as StoryData;

const STORAGE_KEYS = {
    history: 'story-progress-history',
    showTitle: 'story-progress-showTitle',
} as const;

const FADE_DURATION = 150;

function StoryPlayer() {

    const [showTitle, setShowTitle] = usePersistedState(STORAGE_KEYS.showTitle, true);
    const [history, setHistory] = usePersistedState<string[]>(STORAGE_KEYS.history, [story.startNodeId]);
    const [fadeOut, setFadeOut] = useState(false);

    const currentNodeId = history[history.length - 1];
    const canGoBack = history.length > 1;
    const node = story.nodes[currentNodeId];

    // Re-trigger fadeIn animation on node change by toggling a key
    const [animationKey, setAnimationKey] = useState(0);

    const transitionTo = (action: () => void) => {
        setFadeOut(true);
        setTimeout(() => {
            action();
            setFadeOut(false);
            setAnimationKey(prev => prev + 1);
        }, FADE_DURATION);
    };

    const handleChoose = (nextId: string) => {
        transitionTo(() => setHistory(prev => [...prev, nextId]));
    };

    const goBack = () => {
        transitionTo(() => setHistory(prev => prev.slice(0, -1)));
    };

    const restart = () => {
        transitionTo(() => {
            clearPersistedState(STORAGE_KEYS.history, STORAGE_KEYS.showTitle);
            setHistory([story.startNodeId]);
            setShowTitle(true);
        });
    };

    if (showTitle) {
        return (
            <TitleScreen
                title={story.title}
                author={story.author}
                description={story.description}
                onStart={() => transitionTo(() => setShowTitle(false))}
            />
        );
    }

    if (!node) {
        return <ErrorScreen nodeId={currentNodeId} onRestart={restart} />;
    }

    const hasChoices = node.choices.length > 0;
    const contentClass = fadeOut ? styles.fadeOut : styles.content;

    return (
        <div className={styles.container}>
            <div key={animationKey} className={contentClass}>
                <StoryNode node={node} />

                {hasChoices ? (
                    <ChoiceList
                        choices={node.choices}
                        currentNodeId={currentNodeId}
                        onChoose={handleChoose}
                        canGoBack={canGoBack}
                        onGoBack={goBack}
                    />
                ) : (
                    <EndingScreen
                        onRestart={restart}
                        canGoBack={canGoBack}
                        onGoBack={goBack}
                    />
                )}
            </div>
        </div>
    );
}

export default StoryPlayer;
