import styles from './EndingScreen.module.css';

interface EndingScreenProps {
    onRestart: () => void;
    canGoBack?: boolean;
    onGoBack?: () => void;
}

function EndingScreen({ onRestart, canGoBack, onGoBack }: EndingScreenProps) {
    return (
        <div className={styles.container}>
            {canGoBack && onGoBack && (
                <button onClick={onGoBack}>Go Back</button>
            )}
            <button onClick={onRestart}>Restart</button>
        </div>
    );
}

export default EndingScreen;
