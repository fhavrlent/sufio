import { Button, Image } from "react-bootstrap";

type Props = {
  name: string;
  price: number;
};

export const Product = ({ name, price }: Props) => {
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
          <p className="mt-0 mb-0">{price} €</p>
          <Button>Add to cart</Button>
        </div>
      </div>
    </div>
  );
};
