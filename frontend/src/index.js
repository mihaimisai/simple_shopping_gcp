import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<div className="vh-100 bg-secondary d-flex align-items-center justify-content-center">
    <div className="row gx-0 py-4 d-flex align-items-center justify-content-center">
        <h1 className="text-center">Shopping List</h1>
    </div>
    <App />
</div>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
