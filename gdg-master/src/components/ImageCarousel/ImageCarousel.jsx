import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ImageCarousel.module.css";

// Import images
import Frame1 from "./Frame 1 (2).png";
import Frame2 from "./Frame 2.png";
import Frame3 from "./Frame 3.png";

// Custom Arrow Components
const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className={`${styles.arrow} ${styles.prevArrow}`}
            onClick={onClick}
        >
            &#10094; {/* Left arrow symbol */}
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className={`${styles.arrow} ${styles.nextArrow}`}
            onClick={onClick}
        >
            &#10095; {/* Right arrow symbol */}
        </div>
    );
};

const ImageCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        prevArrow: <CustomPrevArrow />, // Custom previous arrow
        nextArrow: <CustomNextArrow />, // Custom next arrow
    };

    const images = [
        {
            src: Frame1,
            alt: "Image 1",
            caption: "Get help with your biggest questions.",
        },
        {
            src: Frame2,
            alt: "Image 2",
            caption:
                "Take the guesswork out of investing with AI-powered insights.",
        },
        {
            src: Frame3,
            alt: "Image 3",
            caption:
                "Hey, can you help me start saving for my child's education?",
        },
    ];

    return (
        <div className={styles.carouselContainer}>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className={styles.slide}>
                        <img
                            src={image.src}
                            alt={image.alt}
                            className={styles.image}
                        />
                        <p className={styles.caption}>{image.caption}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageCarousel;
