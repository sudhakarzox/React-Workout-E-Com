import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {useNavigate} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import CartItem from '../../components/Cart/CartItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ToastNotification from '../../components/Toast/ToastNotification';
import Spinner from 'react-bootstrap/Spinner';
import  {BsCurrencyRupee} from 'react-icons/bs';
import  {HiShoppingCart} from 'react-icons/hi';

function ViewCart() {
    const [cart,setCart]=useState();
    const [dataload,setDataLoad]=useState(false);
    const [incrementDecrementStatus,setIncrementDecrementStatus]=useState(false);
    const [placeOrderStatusSuccess,setPlaceOrderStatusSuccess]=useState(false);
    const [emptyCart,setEmptyCart]=useState(false);
    const [loading,setLoading]=useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        
        axios.get('http://localhost:8081/cart/getCart',{withCredentials: true})
        .then(res=>{
            //console.log(res.data);
            
            setCart(res.data);
            console.log(cart);
           
           if(res.data.cart?.length===[].length||res.data.items?.length===[].length ){
            setEmptyCart(true);
           }else{
            setDataLoad(true);
            //setEmptyCart(false);
           }
           setLoading(false);
        }).catch((err)=>{
            console.log('failed to fetch feeds'+err.message);
        });
    }
    ,[incrementDecrementStatus]);

    const decrementQuantityCount=(id)=>{
        setIncrementDecrementStatus(false);
        axios.delete('http://localhost:8081/cart/decrementProductQuantityFromCart/'+id,{withCredentials: true})
        .then(res=>{
            console.log(res.data);
            setIncrementDecrementStatus(true);
            console.log(incrementDecrementStatus);
        }).catch(()=>{
            console.log('failed decrementQuantityCount');
        });
    };

    const incrementCount = (id) => {
        setIncrementDecrementStatus(false);
        axios.post('http://localhost:8081/cart/addProductsToCart/'+id,{},{withCredentials: true})
        .then(res=>{
            console.log(res.data);
            setIncrementDecrementStatus(true);

        }).catch(()=>{
            console.log('failed to to add cart');
        });
        };

        const placeOrder=async ()=>{
            setLoading(true);
            let cartdata=cart;
            console.log(cartdata);
            try{
            let res= await axios.post('http://localhost:8082/order/postOrder',cartdata,{withCredentials: true});
                    console.log(res.data);
                    setPlaceOrderStatusSuccess(true);
                res=  await axios.delete('http://localhost:8081/cart/clearCart',{withCredentials: true});
                    console.log(res.data);
                    //setEmptyCart(true);
                    navigate('/Orders');
                }catch(err){
                    console.log('failed to place order '+err);
                }
                setLoading(false);
        };
        

    return (
        <Container>
        <Card className='m-3'>
            <Card.Header as="h5">Your Cart <HiShoppingCart></HiShoppingCart> </Card.Header>
            <Card.Body>
                <Card.Title>Cart Item Details</Card.Title>
            </Card.Body>

            <ListGroup className="list-group-flush">
            {dataload && cart.items.map((product, idx) => (
            <ListGroup.Item key={idx}>
                <CartItem  order={false} 
                product={product}
                incrementQuantityCount={incrementCount}
                decrementQuantityCount={decrementQuantityCount}></CartItem>
            </ListGroup.Item>
            ))}

            {!emptyCart && (
            <ListGroup.Item>
            <Card.Title>Total : 
            {dataload && cart.items.map((Product)=>{
                            return Product.quantity+Product.product.price;
                        }).reduce((total,subtotal)=>total+subtotal)} 
                    <BsCurrencyRupee></BsCurrencyRupee>    
            </Card.Title>
                <Button className='m-1 ' onClick={placeOrder.bind(this)}  variant="primary" disabled={loading}>
                    Place Order <HiShoppingCart></HiShoppingCart>
                    {loading && <Spinner animation="border" size="sm" />}
                </Button>
            </ListGroup.Item>
            )}
            {emptyCart&&
            <ListGroup.Item>
            <Card.Title>Cart is empty</Card.Title>
            </ListGroup.Item>
            }
            </ListGroup> 
        </Card>
            
         <ToastNotification
            message="You have no items in the cart"
            position='middle-center'
            show={setPlaceOrderStatusSuccess}
            s={placeOrderStatusSuccess}
            delay={3000}
            ></ToastNotification> 
            

    </Container>
    );
}

export default ViewCart;