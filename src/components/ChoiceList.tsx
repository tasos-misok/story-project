import type { Choice } from '../types/story.ts';
import styles from './ChoiceList.module.css';

interface ChoiceListProps {
    choices: Choice[];
    currentNodeId: string;
    onChoose: (nextId: string) => void;
    canGoBack?: boolean;
    onGoBack?: () => void;
}

function ChoiceList({ choices, currentNodeId, onChoose, canGoBack, onGoBack }: ChoiceListProps) {
    return (
        <div className={styles.choices}>
            {choices.map((choice, index) => (
                <button
                    key={`${currentNodeId}-${index}`}
                    onClick={() => onChoose(choice.nextId)}
                    className={styles.choiceButton}
                >
                    {choice.label}
                </button>
            ))}
            {canGoBack && onGoBack && (
                <button onClick={onGoBack} className={styles.backButton}>
                    Go Back
                </button>
            )}
        </div>
    );
}

export default ChoiceList;
