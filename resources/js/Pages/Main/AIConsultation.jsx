import React, { useState, useRef, useEffect } from "react";
import BaseLayout from "./BaseLayout.jsx";
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
} from "@mui/material";
import { usePage } from "@inertiajs/react";

export default function AIConsultation() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! What can I help you with today?" },
    ]);
    const [input, setInput] = useState("");
    const bottomRef = useRef(null);
    const { props } = usePage();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        console.log(props);
        fetch(route("ai.consultation"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": props.csrf_token || props.csrfToken || "",
            },
            body: JSON.stringify({
                message: input,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Simulasi penambahan pesan balasan
                setMessages((prev) => [
                    ...prev,
                    { role: "user", content: input },
                    { role: "assistant", content: data.response },
                ]);

                setInput(""); // Clear input field after sending
                bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <BaseLayout>
            <Container
                maxWidth="lg"
                sx={{
                    height: "calc(100vh - 80px)",
                    display: "flex",
                    flexDirection: "column",
                    pt: 0,
                }}
            >
                {/* Chat Content Area */}
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: "auto",
                        mb: 2,
                        px: 1,
                        borderRadius: 2,
                        p: 2,
                    }}
                >
                    {messages.map((msg, idx) => (
                        <Paper
                            key={idx}
                            elevation={0}
                            sx={{
                                bgcolor: "blue",
                                mb: 2,
                                pl: msg.role === "user" ? 0 : 0,
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    whiteSpace: "wrap",
                                    color:
                                        msg.role === "user"
                                            ? "#90caf9"
                                            : "#e0e0e0",
                                    fontWeight:
                                        msg.role === "assistant" ? 400 : 500,
                                }}
                            >
                                {msg.content}
                            </Typography>
                        </Paper>
                    ))}
                    <div ref={bottomRef} />
                </Box>

                {/* Input Area */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        position: "sticky",
                        bottom: 0,
                        py: 2,
                        bgcolor: "transparent",
                    }}
                >
                    <TextField
                        fullWidth
                        multiline
                        maxRows={4}
                        variant="outlined"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        InputProps={{
                            sx: {
                                bgcolor: "#1e1e1e",
                                color: "white",
                                borderRadius: 2,
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ height: "56px", borderRadius: 2 }}
                    >
                        Send
                    </Button>
                </Box>
            </Container>
        </BaseLayout>
    );
}
