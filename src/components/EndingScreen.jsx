function EndingScreen({ onRestart }) {
    return (
        <div style={{ marginTop: 16 }}>
            <button onClick={onRestart}>Restart</button>
        </div>
    );
}

export default EndingScreen;
