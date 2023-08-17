import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const isWorking = isCheckingOut || isDeleting;

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  const status = booking.status;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={navigate.bind(null, `/checkin/${booking.id}`)}>
            Check in booking #{booking.id}
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            disabled={isWorking}
            onClick={checkout.bind(null, booking.id)}
          >
            Check out booking #{booking.id}
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delBooking">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>

          <Modal.Window name="delBooking">
            <ConfirmDelete
              disabled={isWorking}
              onConfirm={deleteBooking.bind(null, booking.id, {
                onSettled: () => {
                  navigate("/bookings");
                },
              })}
              resourceName="booking"
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
