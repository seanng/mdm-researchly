import React from 'react';
import { render } from 'react-dom';
import { Unauth } from 'components';
import 'assets/styles/tailwind.css';
import './index.css';

render(<Unauth />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
