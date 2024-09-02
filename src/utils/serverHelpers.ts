export const baseUrlSwitch = () => {
  let BASE_URL = '';

  const location = process.env.ENVIRONMENT ?? 'staging';
  if (location === 'local') {
    BASE_URL = 'https://good-list-backend-vendor.onrender.com/api/v1';
  } else if (location === 'staging') {
    BASE_URL = 'https://good-list-backend-vendor.onrender.com/api/v1';
  } else {
    BASE_URL = 'https://good-list-backend-vendor.onrender.com/api/v1';
  }

  return BASE_URL;
};
