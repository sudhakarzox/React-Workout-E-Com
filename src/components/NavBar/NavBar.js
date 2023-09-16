import { useEffect, useState ,useContext} from 'react';
import {  Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import  {HiShoppingCart} from 'react-icons/hi';
import  {AiFillHome} from 'react-icons/ai';
import { AuthContext } from '../../context';
function NavBar(){
    const {auth,setAuthContext} = useContext(AuthContext);

    const logout=()=>{
        setAuthContext(false);
        console.log(auth);
    }

    return(
        <>
        
        <Navbar bg="dark"   data-bs-theme="dark" >
        <Container  >
          <Navbar.Brand as={Link}  to="/">E-Com</Navbar.Brand>
            <Nav className="me-auto">
                {auth && (<><Nav.Link as={Link}  to="/Home">Home <AiFillHome></AiFillHome></Nav.Link>
                <Nav.Link as={Link} to="/Orders">Orders</Nav.Link></>)}
            </Nav>
            <Nav className="justify-content-end">
                {!auth&&<Nav.Link as={Link} to="/SignUp">SignUp</Nav.Link>}
                
                {auth &&(<> <Nav.Link as={Link} to="/Cart">Cart<HiShoppingCart></HiShoppingCart></Nav.Link>
                <Nav.Link onClick={logout.bind(this)}>Logout</Nav.Link></>)}
            </Nav>
            
            
        </Container>
        
        </Navbar>
        
        </>

    );
}
export default NavBar;