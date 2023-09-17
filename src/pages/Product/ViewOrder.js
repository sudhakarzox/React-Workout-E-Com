import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import CartItem from '../../components/Cart/CartItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ToastNotification from '../../components/Toast/ToastNotification';
import Spinner from 'react-bootstrap/Spinner';


function ViewOrder() {
    const [orders,setOrders]=useState([]);
    const [emptyCart,setEmptyCart]=useState(false);
    const [loading,setLoading]=useState(false);
    
    
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:8082/order/getOrders',{withCredentials: true})
        .then(res=>{
            console.log(res.data.orderDetails);
            if((res.data.orderDetails.length===[].length)){
                setEmptyCart(true);
            }else{
            setOrders(res.data.orderDetails);
            }
            setLoading(false);
        }).catch(()=>{
            console.log('failed to fetch feeds');
            setLoading(false);
        });
    }
    ,[]);
    return (
        
        <Container md>
            {loading && <Spinner animation="border" className="position-absolute top-50 start-50"/>}
        {orders.map((order, idx) => (
            <Card className='m-3'>
                {idx===0 && (<Card.Header as="h5">Your Order History</Card.Header>)}
                <Card.Body>
                    
                    <ListGroup.Item><Card.Title>Order Details</Card.Title></ListGroup.Item>
                    <Card.Subtitle className="my-2 text-muted">
                        OrderId: {order.orderId}
                    </Card.Subtitle>
                    <Card.Subtitle className=" text-muted">Order placed on : {"D "+order.orderDate.substring(0,10) + " T " + order.orderDate.substring(11,19)}</Card.Subtitle>
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
                        
                        Total : 
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