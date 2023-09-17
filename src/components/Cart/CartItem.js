import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function CartItem(props) {
    //const [orderItem, setOrderitem] = useState(false);
    const [product,setProduct]=useState({
        id:null,name:null,description:null,price:null,productQuantity:null,orderStatus:null,orderDate:null}
    );
    //let orderStatus;
    //let orderDate;

    //let product;
    //let incrementQuantityCount;
    //let decrementQuantityCount;

    const incrementQuantityCount=props.incrementQuantityCount;
    const decrementQuantityCount=props.decrementQuantityCount;
    
    //let productQuantity=props.product.quantity;
   useEffect(()=>{
        if(props.order===false){
            //product=props.product.product;
            let p=props.product.product;
            //productQuantity=props.product.quantity;
            setProduct({
                id:p._id,
                name:p.name,
                description:p.description,
                price:p.price,
                productQuantity:props.product.quantity
            });
            
        }else{
            //product=props.product.productId;
            let p=props.product.productId;
            //orderStatus=props.orderStatus;
            setProduct({
                id:p._id,
                name:p.name,
                description:p.description,
                price:p.price,
                orderDate:props.orderDate,
                orderStatus:props.orderStatus,
                productQuantity:props.product.qunatity
            });
            //orderDate=props.orderDate
            //productQuantity=props.product.qunatity;
        }
    },[props.product]);

    return (
       <>
        <Card className=''  border="light">
        <Card.Body className='p-0'>
                <Row>
                    <Col className='me-auto'>
                    
                        
                            <Card.Title >Item : {product.name}</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>Description :  {product.description}</Card.Subtitle>
                            {/* <Card.Subtitle>Stock: Avail</Card.Subtitle> */}
                            
                            <Card.Subtitle className="mb-2 text-muted">Cost : {product.price}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Quantity
                                <ButtonGroup className='m-2 text-center' aria-label="Basic example" size="sm">
                                    {!props.order && (<Button onClick={()=>{incrementQuantityCount(product.id);}} variant="secondary">+</Button>)}  
                                    <Button  variant="secondary">{product.productQuantity}</Button>
                                    {!props.order && (<Button onClick={()=>decrementQuantityCount(product.id)} variant="secondary">-</Button>)}
                                </ButtonGroup>
                            </Card.Subtitle>
                            
                            <Card.Subtitle>SubTotal : {product.productQuantity * product.price}</Card.Subtitle>
                            

                        
                
                    </Col>
                    { props.order && (
                    <Col className="" style={{'textAlign':'end'}}>
                       
                            <div className="justify-content-right">
                            
                            <Card.Subtitle className="m-2 text-muted">OrderStatus : {product.orderStatus}</Card.Subtitle>
                            {/* <Card.Subtitle>Delivered Date : {orderDate}</Card.Subtitle>  */}
                            </div>
                        
                    </Col>)}
                </Row>
            </Card.Body>
        </Card>
        
        </>
    );
}

export default CartItem;