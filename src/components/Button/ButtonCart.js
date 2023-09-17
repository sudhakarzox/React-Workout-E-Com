import Button from 'react-bootstrap/Button';
import  {HiShoppingCart} from 'react-icons/hi';
import Spinner from 'react-bootstrap/Spinner';



function ButtonCart(props) {

    

    return (
        <>
           <Button className='m-1' variant="primary" disabled={props.loading}
           onClick={props.onClick}>
            Add to Cart 
            <HiShoppingCart></HiShoppingCart>
            {props.loading && <Spinner animation="border" size="sm" />}
            </Button>

        </>
        
    );
}

export default ButtonCart;