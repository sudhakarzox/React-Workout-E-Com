import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import CartItem from '../../components/Cart/CartItem';
import { useEffect, useState } from 'react';

function CartOrderView(props) {
    const [order, setOrder] = useState(false);

    return (
        <Container md>

        
        <Card className='m-3'>
            <Card.Header as="h5">Your Cart</Card.Header>
            <Card.Body>
                <Card.Title>Cart Item Details</Card.Title>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
            </Card.Body>

            <ListGroup className="list-group-flush">
            {Array.from({ length: 3 }).map((_, idx) => (
            <ListGroup.Item>
                <CartItem order={order}></CartItem>
            </ListGroup.Item>
            ))}
            <ListGroup.Item>
            <Card.Title>Total: Cost</Card.Title>
                <Button className='m-1 '  variant="primary" >CheckOut</Button>
                
            </ListGroup.Item>
            </ListGroup>
        </Card>
    </Container>
        
    );
}

export default CartOrderView;