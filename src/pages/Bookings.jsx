import BookingTable from "../features/bookings/BookingTable";
import BookingTableOps from "../features/bookings/BookingTableOps";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOps />
      </Row>

      <Row>
        <BookingTable />
      </Row>
    </>
  );
}

export default Bookings;
