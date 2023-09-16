import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import ToastNotification from '../../components/Toast/ToastNotification';
import  {HiShoppingCart} from 'react-icons/hi';

function Product(props) {
    let product=props.product;
    const [successOpCart, setSuccessOpCart] = useState(false);


    const addItemToCart = () => {
        axios.post('http://localhost:8081/cart/addProductsToCart/'+product._id,{},{withCredentials: true})
        .then(res=>{
            console.log(res.data);
            setSuccessOpCart(true);
        }).catch(()=>{
            console.log('failed to to add cart');
        });
        };

    return (
        <>       
            <Card style={{ width: '21rem' }} className='m-auto' >
                
                <Card.Body >
                    <Card.Title>Name : {product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Description : {product.description}</Card.Subtitle>
                    
                    <Card.Subtitle className="mb-2 text-muted">Price : {product.price}</Card.Subtitle>
                    <Button  as={Link} to={'/product/'+product._id}>Product details</Button>
                    <Button className="mx-3" onClick={addItemToCart.bind(this)}>Add to Cart<HiShoppingCart></HiShoppingCart></Button>
                </Card.Body>
            </Card>

            <ToastNotification
            message="Item added to the cart"
            show={setSuccessOpCart}
            s={successOpCart}
            ></ToastNotification>
            </>


    );
}

export default Product;