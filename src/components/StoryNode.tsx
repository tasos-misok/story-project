import type { StoryNode as StoryNodeType } from '../types/story.ts';
import styles from './StoryNode.module.css';

interface StoryNodeProps {
    node: StoryNodeType;
}

function StoryNode({ node }: StoryNodeProps) {
    return (
        <>
            <h1 className={styles.title}>{node.title}</h1>
            <p className={styles.text}>{node.text}</p>
        </>
    );
}

export default StoryNode;
