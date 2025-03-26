import React from "react";
import styled from "styled-components";

const Loader = () => {
    return (
        <StyledWrapper>
            <div className="loader">
                <div className="loader__bar" />
                <div className="loader__bar" />
                <div className="loader__bar" />
                <div className="loader__bar" />
                <div className="loader__bar" />
                <div className="loader__ball" />
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height */
    width: 100vw; /* Full viewport width */
    background-color: #0a0f1f; /* Match the background color of the app */

    .loader {
        position: relative;
        width: 150px; /* Increased size */
        height: 200px; /* Increased size */
    }

    .loader__bar {
        position: absolute;
        bottom: 0;
        width: 20px; /* Increased size */
        height: 50%;
        background: white; /* Changed to white */
        transform-origin: center bottom;
        box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
    }

    .loader__bar:nth-child(1) {
        left: 0px;
        transform: scale(1, 0.2);
        -webkit-animation: barUp1 4s infinite;
        animation: barUp1 4s infinite;
    }

    .loader__bar:nth-child(2) {
        left: 30px; /* Adjusted for increased size */
        transform: scale(1, 0.4);
        -webkit-animation: barUp2 4s infinite;
        animation: barUp2 4s infinite;
    }

    .loader__bar:nth-child(3) {
        left: 60px; /* Adjusted for increased size */
        transform: scale(1, 0.6);
        -webkit-animation: barUp3 4s infinite;
        animation: barUp3 4s infinite;
    }

    .loader__bar:nth-child(4) {
        left: 90px; /* Adjusted for increased size */
        transform: scale(1, 0.8);
        -webkit-animation: barUp4 4s infinite;
        animation: barUp4 4s infinite;
    }

    .loader__bar:nth-child(5) {
        left: 120px; /* Adjusted for increased size */
        transform: scale(1, 1);
        -webkit-animation: barUp5 4s infinite;
        animation: barUp5 4s infinite;
    }

    .loader__ball {
        position: absolute;
        bottom: 20px; /* Adjusted for increased size */
        left: 0;
        width: 20px; /* Increased size */
        height: 20px; /* Increased size */
        background: rgb(44, 143, 255);
        border-radius: 50%;
        -webkit-animation: ball624 4s infinite;
        animation: ball624 4s infinite;
    }

    @keyframes ball624 {
        0% {
            transform: translate(0, 0);
        }

        5% {
            transform: translate(16px, -28px); /* Adjusted for increased size */
        }

        10% {
            transform: translate(30px, -20px); /* Adjusted for increased size */
        }

        17% {
            transform: translate(46px, -48px); /* Adjusted for increased size */
        }

        20% {
            transform: translate(60px, -40px); /* Adjusted for increased size */
        }

        27% {
            transform: translate(76px, -68px); /* Adjusted for increased size */
        }

        30% {
            transform: translate(90px, -60px); /* Adjusted for increased size */
        }

        37% {
            transform: translate(
                106px,
                -88px
            ); /* Adjusted for increased size */
        }

        40% {
            transform: translate(
                120px,
                -80px
            ); /* Adjusted for increased size */
        }

        50% {
            transform: translate(120px, 0); /* Adjusted for increased size */
        }

        57% {
            transform: translate(
                106px,
                -28px
            ); /* Adjusted for increased size */
        }

        60% {
            transform: translate(90px, -20px); /* Adjusted for increased size */
        }

        67% {
            transform: translate(74px, -48px); /* Adjusted for increased size */
        }

        70% {
            transform: translate(60px, -40px); /* Adjusted for increased size */
        }

        77% {
            transform: translate(44px, -68px); /* Adjusted for increased size */
        }

        80% {
            transform: translate(30px, -60px); /* Adjusted for increased size */
        }

        87% {
            transform: translate(14px, -88px); /* Adjusted for increased size */
        }

        90% {
            transform: translate(0, -80px); /* Adjusted for increased size */
        }

        100% {
            transform: translate(0, 0);
        }
    }

    @-webkit-keyframes barUp1 {
        0% {
            transform: scale(1, 0.2);
        }

        40% {
            transform: scale(1, 0.2);
        }

        50% {
            transform: scale(1, 1);
        }

        90% {
            transform: scale(1, 1);
        }

        100% {
            transform: scale(1, 0.2);
        }
    }

    @keyframes barUp1 {
        0% {
            transform: scale(1, 0.2);
        }

        40% {
            transform: scale(1, 0.2);
        }

        50% {
            transform: scale(1, 1);
        }

        90% {
            transform: scale(1, 1);
        }

        100% {
            transform: scale(1, 0.2);
        }
    }

    @-webkit-keyframes barUp2 {
        0% {
            transform: scale(1, 0.4);
        }

        40% {
            transform: scale(1, 0.4);
        }

        50% {
            transform: scale(1, 0.8);
        }

        90% {
            transform: scale(1, 0.8);
        }

        100% {
            transform: scale(1, 0.4);
        }
    }

    @keyframes barUp2 {
        0% {
            transform: scale(1, 0.4);
        }

        40% {
            transform: scale(1, 0.4);
        }

        50% {
            transform: scale(1, 0.8);
        }

        90% {
            transform: scale(1, 0.8);
        }

        100% {
            transform: scale(1, 0.4);
        }
    }

    @-webkit-keyframes barUp3 {
        0% {
            transform: scale(1, 0.6);
        }

        100% {
            transform: scale(1, 0.6);
        }
    }

    @keyframes barUp3 {
        0% {
            transform: scale(1, 0.6);
        }

        100% {
            transform: scale(1, 0.6);
        }
    }

    @-webkit-keyframes barUp4 {
        0% {
            transform: scale(1, 0.8);
        }

        40% {
            transform: scale(1, 0.8);
        }

        50% {
            transform: scale(1, 0.4);
        }

        90% {
            transform: scale(1, 0.4);
        }

        100% {
            transform: scale(1, 0.8);
        }
    }

    @keyframes barUp4 {
        0% {
            transform: scale(1, 0.8);
        }

        40% {
            transform: scale(1, 0.8);
        }

        50% {
            transform: scale(1, 0.4);
        }

        90% {
            transform: scale(1, 0.4);
        }

        100% {
            transform: scale(1, 0.8);
        }
    }

    @-webkit-keyframes barUp5 {
        0% {
            transform: scale(1, 1);
        }

        40% {
            transform: scale(1, 1);
        }

        50% {
            transform: scale(1, 0.2);
        }

        90% {
            transform: scale(1, 0.2);
        }

        100% {
            transform: scale(1, 1);
        }
    }

    @keyframes barUp5 {
        0% {
            transform: scale(1, 1);
        }

        40% {
            transform: scale(1, 1);
        }

        50% {
            transform: scale(1, 0.2);
        }

        90% {
            transform: scale(1, 0.2);
        }

        100% {
            transform: scale(1, 1);
        }
    }
`;

export default Loader;
