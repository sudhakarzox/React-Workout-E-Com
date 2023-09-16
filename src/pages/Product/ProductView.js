import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ToastNotification from '../../components/Toast/ToastNotification';
import  {HiShoppingCart} from 'react-icons/hi';


function ProductView(props) {
  let {productid}=useParams();
  //console.log(productid)
  const [product,setProduct]=useState({name:null,description:null,price:null,quantityInStock:null});
  const [successOpCart, setSuccessOpCart] = useState(false);


  useEffect(()=>{
    
    axios.get('http://localhost:8081/product/getProductById/'+productid,{withCredentials: true})
    .then(res=>{
        console.log(res.data);
        let prod=res.data;
        setProduct({
          name: prod.name,
          description: prod.description,
          price: prod.price,
          quantityInStock: prod.quantityInStock
        })
        
    }).catch(()=>{
        console.log('failed to fetch feeds');
    });
}
,[])


const addItemToCart = () => {
  axios.post('http://localhost:8081/cart/addProductsToCart/'+productid,{},{withCredentials: true})
  .then(res=>{
      console.log(res.data);
      setSuccessOpCart(true);
  }).catch(()=>{
      console.log('failed to to add cart');
  });
  };
  
  const navigate = useNavigate();
    const navigateToCart = () => {
        navigate('/Cart');
      };

      const navigateToHome = () => {
        navigate('/Home');
      };

    return (
      <Container >
        <Card className='m-3'>
          <Card.Body>
          <Card.Title>Product Name : {product.name}</Card.Title>
          <Card.Subtitle>description : {product.description}</Card.Subtitle>
          <Card.Text className="m-0">Product price : {product.price}</Card.Text>
          <Card.Text className="m-0">Quantity In Stock : {product.quantityInStock}</Card.Text>
        
          <Button className='m-1' variant="primary" onClick={addItemToCart.bind(this)}>Add to Cart <HiShoppingCart></HiShoppingCart></Button>
          <Button className='m-1' onClick={navigateToCart.bind(this)} variant="primary" >Go to Cart</Button>
          <Button className='m-1' onClick={navigateToHome.bind(this)} variant="primary">Back</Button>
          </Card.Body>
        </Card>
{console.log('render')}
        <ToastNotification
            message="Item added to the cart"
            show={setSuccessOpCart}
            s={successOpCart}
            ></ToastNotification>
        
    </Container>
        
    );
}

export default ProductView;