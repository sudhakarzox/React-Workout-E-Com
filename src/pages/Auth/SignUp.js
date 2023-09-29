import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Alert, Spinner } from 'react-bootstrap';


function Signup() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName,setFirstName ] = useState();
  const [lastName,setLastName ] = useState();
  const [successSignup, setSuccessSignup] = useState(false);
  const [validated, setValidated] = useState(false);
  const [ValidationError,setValidationError]=useState([]);
  const [loading,setLoading]=useState(false);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    //console.log(loading);
    const form = event.currentTarget;

    //console.log(form);
    if (form.checkValidity() === false) {
      setValidated(true);
      setLoading(false);
      return;
    }

    axios.post('http://localhost:8080/auth/signup',
      {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      })
      .then(res => {
        //console.log(res.data);
        setSuccessSignup(true);
        setLoading(false);
        navigate('/');
      }).catch((error) => {
        setLoading(false);
        console.log('Signup failed', email);
       
          console.log(error.response.data?.error.map(err => err.msg));
        setValidationError(error.response.data?.error.map(err => err.msg));
        
      });
    

  }

  return (
    <div className="m-3">
        <Container  >

      

    <Form onSubmit={handleSubmit} validated={validated} noValidate>
      
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control required type="text" onChange={firstName=>setFirstName(firstName.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control required type="text" onChange={lastName=>setLastName(lastName.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Name.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" onChange={email=>setEmail(email.target.value)}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" onChange={password=>setPassword(password.target.value)}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid Password. Length must be min 6
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      {ValidationError[0] && <Alert variant="danger">{ValidationError}</Alert>}

      <Button variant="primary" type="submit" disabled={loading}>
        Submit {loading && <Spinner animation="border" size="sm" />}
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