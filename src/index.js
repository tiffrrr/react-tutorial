import React from 'react';
import ReactDOM from 'react-dom';

// router
import { Link } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// redux
import { Provider } from 'react-redux';
import store from './store';

// component + css
import './index.css';
import Game from './components/Game';
import Checkbox from './components/Checkbox';
import FixedBar from './components/FixedBar';


// ========================================
// <Router>外層 <Provider>內層
ReactDOM.render(

  <Router>
    <Provider store={store}>
      <div style={{padding:'20px'}}>
          <div className='nav-item'>
              <Link to="/">Game  </Link>
              
          </div>
          <div className='nav-item'>
              <Link to="/checkbox">Checkbox</Link>
          </div>
          <div className='nav-item'>
              <Link to="/fixedbar">FixedBar</Link>
          </div>
      </div>
      <Routes>
        <Route path='/' element={<Game/>} />
        <Route path='/checkbox' element={<Checkbox/>} />
        <Route path='/fixedbar' element={<FixedBar/>} />
      </Routes>
    </Provider>
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