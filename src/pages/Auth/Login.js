import axios from 'axios';
import {  useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import {useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context';
import Spinner from 'react-bootstrap/Spinner';

function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorLoginFail, setErrorLoginFail] = useState(false);
    const {auth,setAuthContext} = useContext(AuthContext)
    const [loading,setLoading]=useState(false);

    const navigate = useNavigate();

    const handleSubmit=(event )=>{
        event.preventDefault();
        setLoading(true);
        setErrorLoginFail(false);
        axios.post('http://localhost:8080/auth/login',
                    {email: email,password: password},
                    {withCredentials: true, credentials: 'include'})
        .then(res=>{
            console.log(res.data);
            setAuthContext(true);
            setLoading(false);
            navigate('/Home');
        }).catch(()=>{
            console.log('login failed',email);
            setErrorLoginFail(true);
            setLoading(false);
        });
    };

    return(
        <div className="m-4">
            <Container>
                
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={email=>setEmail(email.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={password=>setPassword(password.target.value)}/>
            </Form.Group>
            { errorLoginFail && 
            <Alert variant="danger">Incorrect Email/Password...Try Again!</Alert>}            
            <Button variant="primary" type="submit" disabled={loading}>
                Log In {loading && <Spinner animation="border" size="sm" />}
            </Button>
            <Button className="ms-3"  as={Link} to="/SignUp" type="submit">Sign In</Button>
         </Form>
         </Container>
        </div>

    );
}
export default Login;