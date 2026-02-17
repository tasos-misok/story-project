function StoryNode({ node }) {
    return (
        <>
            <h1 style={{ marginBottom: 8 }}>{node.title}</h1>
            <p style={{ lineHeight: 1.6 }}>{node.text}</p>
        </>
    );
}

export default StoryNode;
