function ErrorScreen({ nodeId, onRestart }) {
    return (
        <div>
            <h1>Broken Story Link</h1>
            <p>
                Node "<code>{nodeId}</code>" not found in story.
            </p>
            <button onClick={onRestart}>Restart</button>
        </div>
    );
}

export default ErrorScreen;
