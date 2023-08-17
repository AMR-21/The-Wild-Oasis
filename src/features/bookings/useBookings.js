import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/config";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const currentPage = +searchParams.get("page") || 1;

  const queryClient = useQueryClient();

  // extract filter
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          value: filterValue,
          field: "status",
        };

  // extract sort
  const [sortByField, direction] = (
    searchParams.get("sortBy") || "startDate-desc"
  ).split("-");

  const sortBy = {
    field: sortByField,
    direction,
  };

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: getBookings.bind(null, { filter, sortBy, page: currentPage }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (currentPage < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
      queryFn: getBookings.bind(null, {
        filter,
        sortBy,
        page: currentPage + 1,
      }),
    });

  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
      queryFn: getBookings.bind(null, {
        filter,
        sortBy,
        page: currentPage - 1,
      }),
    });

  return { isLoading, bookings, count, error };
}
