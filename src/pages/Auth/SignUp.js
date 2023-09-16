import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';


function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName,setFirstName ] = useState();
  const [lastName,setLastName ] = useState();
  const [successSignup, setSuccessSignup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit=(event )=>{
    event.preventDefault();
    axios.post('http://localhost:8080/auth/signup',
                { email: email,
                  password: password,
                  firstName:firstName,
                  lastName:lastName })
    .then(res=>{
        console.log(res.data);
        setSuccessSignup(true);
        navigate('/');
    }).catch(()=>{
        console.log('Signup failed',email);
    })
};

  return (
    <div className="m-3">
        <Container  >

    <Form onSubmit={handleSubmit}>
      
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" onChange={firstName=>setFirstName(firstName.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" onChange={lastName=>setLastName(lastName.target.value)} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={email=>setEmail(email.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={password=>setPassword(password.target.value)}/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>


      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
          <option>Choose...</option>
          <option>Karnataka</option>
            <option>Tamil Nadu</option>
            <option>Kerala</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

      <ToastContainer position='bottom-end'>
        <Toast bg='dark' show={successSignup} 
              onClose={() => setSuccessSignup(false)}
              delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Message</strong>
          </Toast.Header>
          <Toast.Body className='text-white'>Account created successfully</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>

    </div>
  );
}

export default Signup;