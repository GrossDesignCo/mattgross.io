import React from 'react';

import './index.scss';

export const Footer = () => (
  <footer className="nowrap sticky">
    <div className="cap-width">
      <div>
        <a href="https://www.linkedin.com/in/m-gross/" target="_blank">
          LinkedIn
        </a>
        {', '}
        <a href="https://github.com/GrossDesignCo" target="_blank">
          GitHub
        </a>
      </div>
      <div>© {new Date().getFullYear()}</div>
    </div>
  </footer>
);
