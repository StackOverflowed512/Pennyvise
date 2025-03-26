import React, { useState } from "react";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Alert,
    Avatar,
    Card,
    CardContent,
} from "@mui/material";
import { fetchChatbotResponse } from "../../api/api";

const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [conversation, setConversation] = useState([]);

    // Unsplash image URL for background
    const backgroundImage =
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

    const handleChat = async () => {
        if (!message.trim()) {
            setError("Please enter a question");
            return;
        }
        setLoading(true);
        setError("");

        // Add user message to conversation
        const userMessage = { text: message, sender: "user" };
        setConversation([...conversation, userMessage]);

        try {
            const result = await fetch("https://pennyvise.onrender.com/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            if (!result.ok) {
                throw new Error("Failed to fetch response");
            }

            const data = await result.json();
            const botMessage = { text: data.response, sender: "bot" };
            setConversation((prev) => [...prev, botMessage]);
            setMessage("");
        } catch (err) {
            console.error("Error:", err);
            setError(err.message || "Failed to get response");
            const errorMessage = {
                text: "Sorry, I couldn't process your request.",
                sender: "bot",
            };
            setConversation((prev) => [...prev, errorMessage]);
        }
        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                py: 8,
            }}
        >
            <Container maxWidth="md">
                <Card sx={{ borderRadius: 4, boxShadow: 24 }}>
                    <CardContent>
                        <Box sx={{ textAlign: "center", mb: 4 }}>
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    bgcolor: "primary.main",
                                    mx: "auto",
                                    mb: 2,
                                }}
                            >
                                AI
                            </Avatar>
                            <Typography
                                variant="h3"
                                gutterBottom
                                sx={{ fontWeight: "bold" }}
                            >
                                Financial AI Assistant
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                            >
                                Ask me anything about finance, investments, or
                                market trends
                            </Typography>
                        </Box>

                        <Paper
                            sx={{
                                p: 3,
                                mb: 3,
                                maxHeight: "400px",
                                overflowY: "auto",
                            }}
                        >
                            {conversation.length === 0 ? (
                                <Box sx={{ textAlign: "center", py: 4 }}>
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        Start a conversation with your financial
                                        assistant
                                    </Typography>
                                </Box>
                            ) : (
                                conversation.map((msg, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            justifyContent:
                                                msg.sender === "user"
                                                    ? "flex-end"
                                                    : "flex-start",
                                            mb: 2,
                                        }}
                                    >
                                        <Paper
                                            sx={{
                                                p: 2,
                                                maxWidth: "80%",
                                                backgroundColor:
                                                    msg.sender === "user"
                                                        ? "primary.light"
                                                        : "background.paper",
                                                color:
                                                    msg.sender === "user"
                                                        ? "primary.contrastText"
                                                        : "text.primary",
                                                borderRadius:
                                                    msg.sender === "user"
                                                        ? "18px 18px 0 18px"
                                                        : "18px 18px 18px 0",
                                            }}
                                        >
                                            <Typography>{msg.text}</Typography>
                                        </Paper>
                                    </Box>
                                ))
                            )}
                        </Paper>

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                fullWidth
                                multiline
                                minRows={1}
                                maxRows={4}
                                variant="outlined"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your financial question here..."
                                disabled={loading}
                            />
                            <Button
                                variant="contained"
                                onClick={handleChat}
                                disabled={loading || !message.trim()}
                                sx={{ px: 4 }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "Send"
                                )}
                            </Button>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Box sx={{ mt: 3, textAlign: "center" }}>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                AI-generated content. Consult a financial
                                advisor for important decisions.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Chatbot;
