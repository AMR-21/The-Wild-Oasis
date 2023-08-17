import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  // 1
  const numBookings = bookings.length;

  // 2
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3
  const checkIns = confirmedStays.length;

  // 4
  const occupation = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );

  const rate = occupation / (numDays * cabinsCount);

  return (
    <>
      <Stat
        title="Booking"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
      />

      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(sales)}
      />

      <Stat
        title="Check ins"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={checkIns}
      />

      <Stat
        title="Occupancy rates"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={`${Math.round(rate * 100)}%`}
      />
    </>
  );
}

export default Stats;
