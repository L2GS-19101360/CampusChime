import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'; // Make sure you have Bootstrap installed and import the necessary components

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show/hide the button based on scroll position
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      variant="dark"
      size="lg"
      id="goToTopBtn"
      style={{ display: isVisible ? 'block' : 'none', position: 'fixed', bottom: '20px', right: '20px', zIndex: '99' }}
      onClick={scrollToTop}
    >
      <i className="bi bi-arrow-up-short"></i>
    </Button>
  );
};

export default ScrollToTopButton;
