import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import CartItem from '../../components/Cart/CartItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ToastNotification from '../../components/Toast/ToastNotification';


function ViewOrder() {
    const [orders,setOrders]=useState([]);
    const [emptyCart,setEmptyCart]=useState(false);
    
    
    useEffect(()=>{
    
        axios.get('http://localhost:8082/order/getOrders',{withCredentials: true})
        .then(res=>{
            console.log(res.data.orderDetails);
            if((res.data.orderDetails.length===[].length)){
                setEmptyCart(true);
            }else{
            setOrders(res.data.orderDetails);
            }
           
        }).catch(()=>{
            console.log('failed to fetch feeds');
        });
    }
    ,[]);
    return (
        
        <Container md>
        {orders.map((order, idx) => (
            <Card className='m-3'>
                {idx===0 && (<Card.Header as="h5">Your Order History</Card.Header>)}
                <Card.Body>
                    
                    <ListGroup.Item><Card.Title>Order Details</Card.Title></ListGroup.Item>
                    <Card.Text>
                        OrderId: {order.orderId}
                    </Card.Text>
                    <Card.Subtitle>Order placed on : {"D "+order.orderDate.substring(0,10) + " T " + order.orderDate.substring(11,19)}</Card.Subtitle>
                </Card.Body>

                <ListGroup className="list-group-flush">
                    { order.orderItems.map((Product, idxx) => (
                        <ListGroup.Item key={idxx}>
                            <CartItem order='true' product={Product} 
                            orderStatus={order.orderStatus} 
                            orderDate={order.orderDate}></CartItem>
                        </ListGroup.Item>
                    ))}
                
                <ListGroup.Item>

                    <Card.Title>
                        
                        Total: 
                        {order.orderItems.map((Product)=>{
                            return Product.subtotal;
                        }).reduce((total,subtotal)=>total+subtotal)}
                        
                    </Card.Title>  

                </ListGroup.Item>
                </ListGroup>
            </Card>
         ))}

<ToastNotification
            message="You have no orders"
            position='middle-center'
            show={setEmptyCart}
            s={emptyCart}
            delay={100000}
            ></ToastNotification>
    </Container>
    );
}

export default ViewOrder;