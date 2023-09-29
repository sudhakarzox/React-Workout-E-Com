import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ToastNotification from '../../components/Toast/ToastNotification';
import ButtonCart from '../Button/ButtonCart';

function Product(props) {
    //let product=props.product;
    const [product,setProduct]=useState({id:null,name:null,description:null,price:null});
    const [successOpCart, setSuccessOpCart] = useState(false);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        setProduct({
            id: props.product._id,
            name: props.product.name,
            description: props.product.description,
            price: props.product.price
           });
    },[]);


    const addItemToCart = () => {
        setLoading(true);
        axios.post('http://localhost:8081/cart/addProductsToCart/'+product.id,{},{withCredentials: true})
        .then(res=>{
            console.log(res.data);
            setSuccessOpCart(true);
            setLoading(false);
        }).catch(()=>{
            console.log('failed to to add cart');
            setLoading(false);
        });
        };

    return (
        <>       
            <Card style={{ width: '21rem' }} className='m-auto' >
                
                <Card.Body >
                    <Card.Title>Name : {product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Description : {product.description}</Card.Subtitle>
                    
                    <Card.Subtitle className="mb-2 text-muted">Price : {product.price}</Card.Subtitle>
                    <Button  as={Link} to={'/product/'+product.id}>Product details</Button>
                    <ButtonCart onClick={addItemToCart} loading={loading} ></ButtonCart>
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