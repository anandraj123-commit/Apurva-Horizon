import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CustomSeparator() {
  const navigate = useNavigate();
  const location = useLocation();

  // Map base paths to breadcrumb labels
  const breadcrumbMap = {
    '/admin/content-type': 'List',
    '/admin/content-type/add': 'Add',
    '/admin/content-type/update': 'Update',
    '/admin/content-type/view': 'View',
  };

  // Match dynamic routes with parameters
  const getCurrentBreadcrumb = () => {
    const pathSegments = location.pathname.split('/').filter((x) => x);
    const basePath = `/${pathSegments.slice(0, 3).join('/')}`;
    return breadcrumbMap[basePath] || 'List';
  };

  const currentBreadcrumb = getCurrentBreadcrumb();

  function handleClick(event, path) {
    event.preventDefault();
    navigate(path);
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={(e) => handleClick(e, '/')}
    >
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/admin/content-type"
      onClick={(e) => handleClick(e, '/admin/content-type')}
    >
      Content-Type
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      {currentBreadcrumb}
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}

