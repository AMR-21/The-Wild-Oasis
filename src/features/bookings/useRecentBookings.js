import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const days = searchParams.get("last") ? +searchParams.get("last") : 7;

  const queryDate = subDays(new Date(), days).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: getBookingsAfterDate.bind(null, queryDate),
    queryKey: ["bookings", `last-${days}`],
  });

  return { isLoading, bookings };
}
