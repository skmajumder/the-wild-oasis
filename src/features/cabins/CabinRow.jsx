import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";

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
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinID,
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabin;

  const handleDuplicateCabin = () => {
    createCabin({
      name: `Copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  };

  return (
    <Table.Row>
      <Image src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <p>Fits up to {maxCapacity} guests</p>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount ? formatCurrency(discount) : "--"}</Discount>
      <div>
        <button
          onClick={handleDuplicateCabin}
          disabled={isCreating}
          title="Duplicate cabin"
        >
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open opens="edit">
            <button title="Edit cabin">
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabin={cabin} />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens="delete">
            <button title="Delete cabin">
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`Cabin ${name}`}
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinID)}
            />
          </Modal.Window>
        </Modal>

        <Menus.Menu>
          <Menus.Toggle id={cabinID} />

          <Menus.List id={cabinID}>
            <Menus.Button>
              <HiSquare2Stack />
              <span>Duplicate</span>
            </Menus.Button>
            <Menus.Button>
              <HiPencil />
              <span>Edit</span>
            </Menus.Button>
            <Menus.Button>
              <HiTrash />
              <span>Delete</span>
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
