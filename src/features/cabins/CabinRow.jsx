import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 3rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Image = styled.img`
  display: block;
  width: 6.4rem;
  border-radius: 2px;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.p`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.p`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const { image, name, maxCapacity, regularPrice, discount } = cabin;

  return (
    <TableRow role="row">
      <Image src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <p>Fits up to {maxCapacity} guests</p>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount ? formatCurrency(discount) : "--"}</Discount>
      <button>Delete</button>
    </TableRow>
  );
};

export default CabinRow;
