import styles from './TitleScreen.module.css';

interface TitleScreenProps {
    title: string;
    author?: string;
    description?: string;
    onStart: () => void;
}

function TitleScreen({ title, author, description, onStart }: TitleScreenProps) {
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            {author && <p className={styles.author}>by {author}</p>}
            {description && <p className={styles.description}>{description}</p>}
            <div className={styles.startButton}>
                <button onClick={onStart}>
                    Begin Adventure
                </button>
            </div>
        </div>
    );
}

export default TitleScreen;
