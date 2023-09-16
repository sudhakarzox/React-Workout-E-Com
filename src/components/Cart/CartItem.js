import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {useNavigate} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function CartItem(props) {
    const [orderItem, setOrderitem] = useState(false);
    let orderStatus;
    let orderDate;

    let product;
    let incrementQuantityCount;
    let decrementQuantityCount;
    
    let productQuantity=props.product.quantity;
    
    if(props.order===false){
        product=props.product.product;
        productQuantity=props.product.quantity;
        incrementQuantityCount=props.incrementQuantityCount;
        decrementQuantityCount=props.decrementQuantityCount;
    }else{
        product=props.product.productId;
        orderStatus=props.orderStatus;
        orderDate=props.orderDate
        productQuantity=props.product.qunatity;
    }

    return (
       <>
        <Card className=''  border="light">
        <Card.Body>
                <Row>
                    <Col className='me-auto'>
                    
                        
                            <Card.Title>Product Name : {product.name}</Card.Title>
                            <Card.Subtitle>some subtitle</Card.Subtitle>
                            <Card.Text>Product description :  {product.description}</Card.Text>
                            {/* <Card.Subtitle>Stock: Avail</Card.Subtitle> */}
                            
                            <Card.Subtitle>Cost : {product.price}</Card.Subtitle>
                            <Card.Subtitle>Quantity
                                <ButtonGroup className='m-2 text-center' aria-label="Basic example" size="sm">
                                    {!props.order && (<Button onClick={()=>incrementQuantityCount(product._id)} variant="secondary">+</Button>)}  
                                    <Button variant="secondary">{productQuantity}</Button>
                                    {!props.order && (<Button onClick={()=>decrementQuantityCount(product._id)} variant="secondary">-</Button>)}
                                </ButtonGroup>
                            </Card.Subtitle>
                            
                            <Card.Subtitle>SubTotal : {productQuantity * product.price}</Card.Subtitle>
                            

                        
                
                    </Col>
                    <Col className="" style={{'textAlign':'end'}}>
                        { props.order && (
                            <div className="justify-content-right">
                            
                            <Card.Subtitle>OrderStatus : {orderStatus}</Card.Subtitle>
                            {/* <Card.Subtitle>Delivered Date : {orderDate}</Card.Subtitle>  */}
                            </div>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        
        </>
    );
}

export default CartItem;