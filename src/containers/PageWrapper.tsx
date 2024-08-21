import { Header } from '@/components/typography/Header';
import React, { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  pageHeader: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, pageHeader }) => {
  return (
    <div className="m-20 lg:ml-72 mt-14 p-8">
      <Header header={pageHeader} />
      <div className='my-10'>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;