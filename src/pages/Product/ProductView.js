import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ToastNotification from '../../components/Toast/ToastNotification';
import Placeholder from 'react-bootstrap/Placeholder';
import ButtonCart from '../../components/Button/ButtonCart';



function ProductView(props) {
  let {productid}=useParams();
  //console.log(productid)
  const [product,setProduct]=useState({name:null,description:null,price:null,quantityInStock:null});
  const [successOpCart, setSuccessOpCart] = useState(false);
  const [loading,setLoading]=useState(true);


  useEffect(()=>{
    setLoading(true);
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
        setLoading(false);
    }).catch(()=>{
        console.log('failed to fetch feeds');
        setLoading(false);
    });
}
,[])


const addItemToCart = () => {
  setLoading(true);
  axios.post('http://localhost:8081/cart/addProductsToCart/'+productid,{},{withCredentials: true})
  .then(res=>{
   

      console.log(res.data);
      setSuccessOpCart(true);
      setLoading(false);

  }).catch(()=>{
    setLoading(false);

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
          <Card.Title>Product Name : {product.name?product.name: <Placeholder xs={6} />}</Card.Title>
          <Card.Subtitle>description : {product.description?product.description: <Placeholder xs={3} />}</Card.Subtitle>
          <Card.Text className="m-0">Product price : {product.price?product.price: <Placeholder xs={4} />}</Card.Text>
          <Card.Text className="m-0">Quantity In Stock : {product.quantityInStock?product.quantityInStock: <Placeholder xs={6} />}</Card.Text>
        
          <ButtonCart onClick={addItemToCart.bind(this)} loading={loading} ></ButtonCart>
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