import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <div>
          <Button onClick={() => setShowForm((show) => !show)}>
            {showForm ? "Close form" : "Add new cabin"}
          </Button>
        </div>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
