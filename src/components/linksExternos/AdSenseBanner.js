import React from 'react';

const AdSenseBanner = () => {
  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <iframe
        src="/adsense-banner.html"  // Caminho correto para o arquivo HTML na pasta public
        style={{ border: 'none', width: '100%', height: 'auto' }}
        title="AdSense Banner"
        // frameBorder="0"
      />
    </div>
  );
};

export default AdSenseBanner;
