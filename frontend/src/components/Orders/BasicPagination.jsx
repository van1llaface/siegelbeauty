import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({ count, currentPage, onPageChange }) {
  const handlePageChange = (event, page) => {
    onPageChange(event, parseInt(page));
  };

  return (
    <Stack spacing={2}>
      <Pagination count={count} page={currentPage} onChange={handlePageChange} />
    </Stack>
  );
}
