export interface Choice {
    label: string;
    nextId: string;
}

export interface StoryNode {
    title: string;
    text: string;
    choices: Choice[];
}

export interface StoryData {
    title: string;
    author?: string;
    description?: string;
    startNodeId: string;
    nodes: Record<string, StoryNode>;
}
