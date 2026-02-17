import { describe, it, expect } from 'vitest';
import type { StoryData } from '../../types/story.ts';
import storyData from '../story.json';

const story = storyData as StoryData;
const { startNodeId, nodes } = story;
const nodeIds = Object.keys(nodes);

describe('story.json structure', () => {
    it('has a title', () => {
        expect(story.title).toBeDefined();
        expect(typeof story.title).toBe('string');
    });

    it('has a startNodeId that exists in nodes', () => {
        expect(startNodeId).toBeDefined();
        expect(nodes[startNodeId]).toBeDefined();
    });

    it.each(nodeIds)('node "%s" has required fields', (id) => {
        const node = nodes[id];
        expect(node).toHaveProperty('title');
        expect(node).toHaveProperty('text');
        expect(node).toHaveProperty('choices');
        expect(typeof node.title).toBe('string');
        expect(typeof node.text).toBe('string');
        expect(Array.isArray(node.choices)).toBe(true);
    });
});

describe('story.json references', () => {
    it.each(nodeIds)('all nextId values in node "%s" point to existing nodes', (id) => {
        const { choices } = nodes[id];
        for (const choice of choices) {
            expect(choice).toHaveProperty('label');
            expect(choice).toHaveProperty('nextId');
            expect(nodes[choice.nextId]).toBeDefined();
        }
    });

    it.each(nodeIds)('node "%s" has no duplicate choice labels', (id) => {
        const labels = nodes[id].choices.map((c) => c.label);
        expect(labels.length).toBe(new Set(labels).size);
    });
});

describe('story.json reachability', () => {
    it('every node is reachable from startNodeId', () => {
        const visited = new Set<string>();
        const queue = [startNodeId];

        while (queue.length > 0) {
            const current = queue.shift()!;
            if (visited.has(current)) continue;
            visited.add(current);

            const node = nodes[current];
            if (!node) continue;
            for (const choice of node.choices) {
                if (!visited.has(choice.nextId)) {
                    queue.push(choice.nextId);
                }
            }
        }

        const unreachable = nodeIds.filter((id) => !visited.has(id));
        expect(unreachable).toEqual([]);
    });
});
