import { Button, Image } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { Product as ProductType } from "../../types";
import { useNavigate } from "react-router-dom";
import { addProductToCart } from "../../store/cart-slice";

export const Product = (props: ProductType) => {
  const { unitPrice, name, stock } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartState = useAppSelector((state) => state.cart);

  const productInCart = cartState.items.find(
    ({ product }) => product.id === props.id
  );

  const onClick = () => {
    dispatch(addProductToCart(props));
    navigate("/cart");
  };
  const isOutOfStock =
    stock === 0 || (productInCart && productInCart?.quantity >= stock);
  return (
    <div className="mt-3 mb-3">
      <Image
        src={`https://picsum.photos/420/260?random=${name}`}
        fluid
        thumbnail
      />
      <div className="mt-3">
        <div>
          <h4>{name}</h4>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p className="mt-0 mb-0">{unitPrice} €</p>
          <Button onClick={onClick} disabled={isOutOfStock}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};
