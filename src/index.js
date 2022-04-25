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
import AnchorPage from './components/AnchorPage';


// ========================================
// <Router>外層 <Provider>內層
const nav = [
  {link:'/',component:'Game'},
  {link:'/checkbox',component:'Checkbox'},
  {link:'/fixedbar',component:'FixedBar'},
  {link:'/anchor',component:'Anchor'},
]
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Game/>} />
        <Route path='/checkbox' element={<Checkbox/>} />
        <Route path='/fixedbar' element={<FixedBar/>} />
        <Route path='/anchor' element={<AnchorPage/>} />
      </Routes>
      <div style={{padding:'20px'}}>
          {
            nav.map((element,index) => {
              return(
                <div className='nav-item' key={index}>
                    <Link to={element.link}>{element.component}  </Link>
                </div>
              )
            })
          }
      </div>
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