import React from "react";
import "./PhoneFrame.css";

// Constants for iPhone dimensions
const IPHONE_WIDTH = 375;
const IPHONE_HEIGHT = 812;

function PhoneFrame({ children }) {
    return (
        <div className="phone-container">
            <div
                className="phone-frame"
                style={{
                    width: `${IPHONE_WIDTH}px`,
                    height: `${IPHONE_HEIGHT}px`,
                }}
            >
                <div className="phone-notch" />
                <div className="phone-content">{children}</div>
            </div>
        </div>
    );
}

export default PhoneFrame;
