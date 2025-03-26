import React, { useState } from "react";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Grid,
    CircularProgress,
    Alert,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";

// Create a theme for Material-UI
const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#dc004e",
        },
    },
});

function App() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChat = async () => {
        if (!message.trim()) {
            setError("Please enter a question");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const result = await axios.post("https://pennyvise.onrender.com/api/chat", {
                message: message,
            });
            setResponse(result.data.response); // Direct use of response without HTML stripping
            setMessage("");
        } catch (error) {
            console.error("Error:", error);
            setError(
                error.response?.data?.error ||
                "Sorry, there was an error processing your request."
            );
        }
        setLoading(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        align="center"
                    >
                        Financial Assistant
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h5" gutterBottom>
                                    Ask Anything About Finance
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Ask any financial question..."
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        console.log("data sending");
                                        handleChat();
                                    }}
                                    disabled={loading}
                                    fullWidth
                                >
                                    {loading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        "Get Answer"
                                    )}
                                </Button>
                                {error && (
                                    <Alert severity="error" sx={{ mt: 2 }}>
                                        {error}
                                    </Alert>
                                )}
                                {response && (
                                    <Paper
                                        sx={{ mt: 2, p: 2, bgcolor: "grey.50" }}
                                    >
                                        <Typography
                                            style={{ whiteSpace: "pre-line" }}
                                        >
                                            {response}
                                        </Typography>
                                    </Paper>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;
