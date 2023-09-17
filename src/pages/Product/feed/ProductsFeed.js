
import Product from "../../../components/Product/Product";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

function ProductsFeed() {
 
  const [productFeed,setProductFeed]=useState([]);
  const [loading,setLoading]=useState(false);


  useEffect(()=>{
    setLoading(true);
        axios.get('http://localhost:8081/product/getProducts',{withCredentials: true})
        .then(res=>{
            console.log(res.data);
            setProductFeed(res.data);
            setLoading(false);
        }).catch(()=>{
            console.log('failed to fetch feeds');
            setLoading(false);
        });
  }
  ,[])

    return (
      <Container className='my-3'>
        {loading && <Spinner animation="border" z-index='-1' className="position-absolute top-50 start-50"/>}

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