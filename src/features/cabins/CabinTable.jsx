import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function CabinTable() {
  const { cabins, isLoading } = useCabins();

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "";
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1 Filter
  let activeCabins = cabins;

  if (filterValue === "no-discount")
    activeCabins = activeCabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    activeCabins = activeCabins.filter((cabin) => cabin.discount > 0);

  // 2 Sort

  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  activeCabins = activeCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={activeCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />

        <Table.Footer>
          <Pagination count={cabins?.length || 0} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CabinTable;
