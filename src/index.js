// ./src/index.js

import React from 'react';
import { render } from 'react-dom';  // react-dom에서 render 함수 가져오기
import App from 'components/App';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);


