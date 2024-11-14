import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => (
  <div 
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
    }}
  >
    <div className="text-center">
      <BootstrapSpinner animation="border" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </BootstrapSpinner>
      <p className="mt-2 text-light">Loading data...</p>
    </div>
  </div>
);

export default Spinner;
