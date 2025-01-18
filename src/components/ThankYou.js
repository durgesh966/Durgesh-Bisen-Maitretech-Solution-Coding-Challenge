import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <header className="site-header text-center mb-5">
        <h1 className="site-header__title">THANK YOU!</h1>
      </header>

      <div className="main-content text-center">
        <i className="fa fa-check main-content__checkmark mb-4" id="checkmark" style={{ fontSize: '4rem', color: '#28a745' }}></i>
        <p className="main-content__body" style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
          Your Order is placed.
        </p>

        <div className="mt-4">
          <button
            onClick={handleRedirect}
            className="btn btn-primary"
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '5px',
            }}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
