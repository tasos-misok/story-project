import { useState } from 'react';
import story from '../story/story.json';
import StoryNode from './StoryNode.jsx';
import ChoiceList from './ChoiceList.jsx';
import EndingScreen from './EndingScreen.jsx';
import ErrorScreen from './ErrorScreen.jsx';

function StoryPlayer() {

    const [currentNodeId, setCurrentNodeId] = useState(story.startNodeId);

    const node = story.nodes[currentNodeId];

    const restart = () => setCurrentNodeId(story.startNodeId);

    if (!node) {
        return <ErrorScreen nodeId={currentNodeId} onRestart={restart} />;
    }

    const hasChoices = (node.choices ?? []).length > 0;

    return (
        <div style={{ maxWidth: 700, margin: "40px auto", padding: 16 }}>
            <StoryNode node={node} />

            {hasChoices ? (
                <ChoiceList
                    choices={node.choices}
                    currentNodeId={currentNodeId}
                    onChoose={setCurrentNodeId}
                />
            ) : (
                <EndingScreen onRestart={restart} />
            )}
        </div>
    );
}

export default StoryPlayer;
