function ChoiceList({ choices, currentNodeId, onChoose }) {
    return (
        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
            {choices.map((choice, index) => (
                <button
                    key={`${currentNodeId}-${index}`}
                    onClick={() => onChoose(choice.nextId)}
                    style={{ padding: "10px 12px", cursor: "pointer" }}
                >
                    {choice.label}
                </button>
            ))}
        </div>
    );
}

export default ChoiceList;
