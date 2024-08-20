import PageWrapper from '@/containers/PageWrapper';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <PageWrapper pageHeader='Home'>
      <h1>Welcome to the Home Page</h1>
      <p>This is the content of the home page.......................................</p>
    </PageWrapper>
  );
};

export default HomePage;