
import Product from "../../../components/Product/Product";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductsFeed() {
 
  const [productFeed,setProductFeed]=useState([]);

  useEffect(()=>{
    
        axios.get('http://localhost:8081/product/getProducts',{withCredentials: true})
        .then(res=>{
            console.log(res.data);
            setProductFeed(res.data);
        }).catch(()=>{
            console.log('failed to fetch feeds');
        });
  }
  ,[])

    return (
      <Container className='my-3'>
        <Row xs={1}  className="g-4" >
        {productFeed.map((product, idx) => (
          <Col key={idx} md>
            <Product product={product}></Product>
          </Col>
        ))}
        </Row>
      </Container>
        
    );
}

export default ProductsFeed;