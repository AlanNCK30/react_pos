export function PopupFeedback({ feedback }) {
    if (!feedback) {
        return null;
    }

    return (
        <div
            className={`rounded-lg px-4 py-3 text-lg ${
                feedback.type === "success"
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border border-rose-200 bg-rose-50 text-rose-700"
            }`}
        >
            {feedback.message}
        </div>
    );
}
