import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/ProjectImagesSlider.module.css";

export default function ProjectImagesSlider({ images, videoUrls }) {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    ref: (slider1) => setNav1(slider1),
  };

  const thumbnailSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    asNavFor: nav1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    ref: (slider2) => setNav2(slider2),
  };

  return (
    <div>
      <Slider {...settings}>
        {videoUrls.map((url, index) => (
          <div key={index} className={styles.sliderImageContainer}>
            <iframe
              className={styles.sliderImage}
              title="YouTube video"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${url}`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        ))}

        <div className={styles.sliderImageContainer}>
          <img
            className={styles.sliderImage}
            src={images.preview}
            alt={`Preview image`}
          />
        </div>
        {images.urls.map((image, index) => (
          <div className={styles.sliderImageContainer} key={index}>
            <img
              className={styles.sliderImage}
              src={image}
              alt={`Slider Image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
      <Slider {...thumbnailSettings} className={styles.navBackground}>
        {videoUrls.length > 0 &&
          videoUrls.map((url, index) => (
            <div className={styles.secondSliderImageContainer} key={index}>
              <img
                className={styles.navSliderImage}
                src="../../images/video-placeholder.jpg"
                alt=""
              />
            </div>
          ))}

        <div className={styles.secondSliderImageContainer}>
          <img
            className={styles.navSliderImage}
            src={images.preview}
            alt={`Preview image`}
          />
        </div>
        {images.urls.length > 0 &&
          images.urls.map((image, index) => (
            <div className={styles.secondSliderImageContainer} key={index}>
              <img
                className={styles.navSliderImage}
                src={image}
                alt={`Slider Image ${index + 1}`}
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}
