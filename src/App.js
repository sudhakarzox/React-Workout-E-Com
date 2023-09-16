import './App.css';
import NavBar from './components/NavBar/NavBar.js';
import Login from './pages/Auth/Login.js';
import Signup from './pages/Auth/SignUp.js';
import ProductFeed from './pages/Product/feed/ProductsFeed';
import Layout from './components/Layout/Layout.js';
import {  Route, Routes} from 'react-router-dom';
import ProductView from './pages/Product/ProductView';
import ViewCart from './pages/Product/ViewCart';
import ViewOrders from './pages/Product/ViewOrder';
import { useContext, useState } from 'react';
import { AuthContext } from './context';


function App() {
  const [auth,setAuth]=useState(false);
  function setAuthContext(value){
    setAuth(value);
  }
  console.log(auth)
  return (
    <div className="App">
     
    <AuthContext.Provider value={{auth,setAuthContext}}>
    <Layout  header={<NavBar></NavBar>}>
        <Routes>
        <Route path="/*" element={ <Login/>}/>
        <Route path="/SignUp" element={ <Signup/>}/>
        {auth && (<>
          <Route path="/Home" element={ <ProductFeed/>}/>
          <Route path="/Product/:productid" element={ <ProductView/>}/>
          <Route path="/Cart" element={ <ViewCart/>}/>
          <Route path="/Orders" element={ <ViewOrders/>}/> </>
        )}
        
        </Routes>
      
      </Layout>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
