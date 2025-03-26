import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import About from "./pages/About/About";
import Main from "./pages/Main/Main"; // Import Main component
import ChatbotIcon from "./components/ChatbotIcon";
import Chatbot from "./pages/Chatbot/Chatbot";

const App = () => {
    const location = useLocation(); // Track the current route
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Show loader only on the initial page load (homepage)
        if (location.pathname === "/") {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 4000); // 4 seconds delay

            return () => clearTimeout(timer);
        } else {
            setIsLoading(false); // Skip loader for other routes
        }
    }, [location.pathname]);

    if (isLoading && location.pathname === "/") {
        return <Loader />;
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/main" element={<Main />} /> {/* Add Main Route */}
                <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
            <ChatbotIcon />
        </>
    );
};

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default AppWrapper;
