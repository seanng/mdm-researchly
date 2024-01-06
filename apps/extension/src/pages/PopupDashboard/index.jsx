import React from 'react';
import { render } from 'react-dom';
import { Dashboard } from 'components';
import 'assets/styles/tailwind.css';
import './index.css';

render(<Dashboard />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
