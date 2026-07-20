import { Pagination } from "@mui/material";

interface Props
{
  page: number,
  totalPages: number,
  onChange: (page: number) => void;
};

const PagePagination = ({
  page,
  totalPages,
  onChange
}: Props) => {
  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={
        (_, value) => onChange(value)
      }
    />
  );
}

export { PagePagination };
