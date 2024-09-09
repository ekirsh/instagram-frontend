import React from 'react';
import UserList from './components/UserList';
import './App.css';

const App = () => {
  return (
    <div className="App bg-gray-100 min-h-screen py-8">
      <h1 className="text-4xl font-bold text-center">copycat v2</h1>
      <UserList />
    </div>
  );
};

export default App;
