import React, { useState } from 'react';
import Nav from '../components/nav';

const HomePage = () => {
  // Define style objects with the purple theme
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  };

  const headerStyle = {
    borderBottom: '2px solid #eee',
    paddingBottom: '15px',
    marginBottom: '30px',
  };

  const titleStyle = {
    fontSize: '40px',
    color: '#84466a', // Purple theme color
    margin: '0',
  };

  const productContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
  };

  const productImageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '20px',
  };

  const productTitleStyle = {
    fontSize: '28px',
    color: '#333',
    marginBottom: '10px',
  };

  const productDescriptionStyle = {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
    lineHeight: '1.5',
  };

  const priceStyle = {
    fontSize: '22px',
    color: '#84466a', // Purple theme color
    marginBottom: '20px',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    backgroundColor: '#84466a', // Purple theme color
    color: '#fff',
    border: 'none',
    padding: '12px 25px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#6a3755', // Darker shade of purple for hover effect
  };

  // Handle button hover state
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={containerStyle}>
      <Nav />
      <header style={headerStyle}>
        <h1 style={titleStyle}>Product Page</h1>
      </header>
      <main>
        <div style={productContainerStyle}>
          <img
            src="https://via.placeholder.com/400"
            alt="Product"
            style={productImageStyle}
          />
          <h2 style={productTitleStyle}>Product Name</h2>
          <p style={productDescriptionStyle}>
            This is a detailed description of the product, highlighting its features, benefits, and any other relevant information that might interest potential customers.
          </p>
          <p style={priceStyle}>$99.99</p>
          <button
            style={isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Add to Cart
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
