import styles from './ErrorScreen.module.css';

interface ErrorScreenProps {
    nodeId: string;
    onRestart: () => void;
}

function ErrorScreen({ nodeId, onRestart }: ErrorScreenProps) {
    return (
        <div className={styles.container}>
            <h1>Broken Story Link</h1>
            <p>
                Node "<code>{nodeId}</code>" not found in story.
            </p>
            <button onClick={onRestart}>Restart</button>
        </div>
    );
}

export default ErrorScreen;
