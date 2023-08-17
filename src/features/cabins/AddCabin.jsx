import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";
import Modal from "../../ui/Modal";
import { styled } from "styled-components";

const Div = styled.div`
  margin-left: auto;
`;

function AddCabin() {
  return (
    <Div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>

        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </Div>
  );
}

export default AddCabin;
