function addMessage(message: string, sender: "chatbot" | "user") {
    const chat = document.getElementById("messages");
    const p = document.createElement("p");
    p.innerText = message;
    p.classList.add(sender);
    chat?.appendChild(p);
}

document.getElementById("chatinput")?.addEventListener("keyup", async (event) => {
    const input = document.getElementById("chatinput") as HTMLInputElement | undefined;
    if (!input) {
        return;
    }
    if (event.key === "Enter") {
        addMessage(input?.value, "user");
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: input?.value
        })
        const text = await response.text();
        addMessage(text, "chatbot");
        input.value = "";
    }
});

