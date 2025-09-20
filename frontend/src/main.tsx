import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <h1 className="text-3xl font-bold text-gray-800">Kanban Personal Manager</h1>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);