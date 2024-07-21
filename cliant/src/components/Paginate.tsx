import { Pagination } from "@yamada-ui/react"

export const Paginate = () => {
  return (
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={1}
      onChange={(page) => console.log(page)}
    />
  );
}