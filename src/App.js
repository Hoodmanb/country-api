import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Index';
import Country from './components/Country';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/country" element={<Country />} />
            </Routes>
        </Router>
    );
}

export default App;