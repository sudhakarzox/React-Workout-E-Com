import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const ToastNotification=(props)=>{
 
  //const [show,setShow]=useState(props.show);
    return(
        <ToastContainer position={props.position?props.position:'bottom-end'} >
          <Toast bg='dark' show={props.s} 
          onClose={() => (props.show(false))}
                delay={props.delay?props.delay:5000} autohide>
            <Toast.Header>
              <strong className="me-auto">Message</strong>
            </Toast.Header>
            <Toast.Body className='text-white'>{props.message}</Toast.Body>
          </Toast>
        </ToastContainer>
    );
}

export default  ToastNotification;