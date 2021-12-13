import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Navbar } from './components/Navbar/Navbar'
import cl from './App.module.css'


function App() {
   return (
      <BrowserRouter>
         <Navbar />
         <div className={cl.container}>
            <Switch>
               <Route path={"/"} exact component={Home} />
               <Route path={"/about"} component={About} />
            </Switch>
         </div>
      </BrowserRouter>
   );
}

export default App;
