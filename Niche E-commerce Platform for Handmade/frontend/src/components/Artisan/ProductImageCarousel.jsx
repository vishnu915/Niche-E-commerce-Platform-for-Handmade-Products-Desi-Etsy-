import React, { useEffect, useRef, useState } from "react";

const ProductImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
    }

    return () => clearInterval(intervalRef.current);
  }, [images]);

  const goToImage = (idx) => {
    setCurrentIndex(idx);
    resetInterval();
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetInterval();
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetInterval();
  };

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prevImage();
    else if (diff < -50) nextImage();
  };

  return (
    <div
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.length > 0 ? (
        <>
          <img
            src={`data:${images[currentIndex].contentType};base64,${images[currentIndex].data}`}
            className="carousel-img"
            alt={`Product ${currentIndex + 1}`}
          />

          {images.length > 1 && (
            <>
              <button className="carousel-btn left" onClick={prevImage}>
                ‹
              </button>
              <button className="carousel-btn right" onClick={nextImage}>
                ›
              </button>

              <div className="carousel-dots">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i === currentIndex ? "active" : ""}`}
                    onClick={() => goToImage(i)}
                  ></span>
                ))}
              </div>

              <div className="carousel-thumbs">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={`data:${img.contentType};base64,${img.data}`}
                    alt={`Thumb ${i + 1}`}
                    className={`thumb-img ${
                      i === currentIndex ? "selected" : ""
                    }`}
                    onClick={() => goToImage(i)}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="carousel-placeholder">No image available</div>
      )}
    </div>
  );
};

export default ProductImageCarousel;
