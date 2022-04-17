import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import Game from './components/Game';
import Checkbox from './components/Checkbox';


// ========================================

ReactDOM.render(
  // <Game />,
  <Router>
    <div style={{padding:'20px'}}>
        <div className='nav-item'>
            <Link to="/">Game  </Link>
            
        </div>
        <div className='nav-item'>
            <Link to="/checkbox">Checkbox</Link>

        </div>
    </div>
    <Routes>
      <Route path='/' element={<Game/>} />
      <Route path='/checkbox' element={<Checkbox/>} />
    </Routes>
  </Router>,

  document.getElementById('root')
);




// <Router>
//   <Link to="/">Home</Link>

//         {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//         <Switch>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/users">
//             <Users />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//     </Router>