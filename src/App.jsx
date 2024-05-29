import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import UserList from './UserList';
import Home from './Home';
import About from './About';
import Contact from './Contact';



const App = () => {
return (

/* <div>
<h1>App React con MockAPI.io</h1>
<UserList />
</div> */

<Router>
<nav>
<ul>
<li><Link to="/">Home</Link></li>
<li><Link to="/about">About</Link></li>
<li><Link to="/contact">Contact</Link></li>
<li><Link to="/userlist">UserList</Link></li>
</ul>
</nav>

<Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/userlist" element={<UserList/>} />
</Routes>
</Router>

);
};

export default App;