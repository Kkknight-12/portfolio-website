import React from 'react';

type SectionHeadingProps = {
  children: React.ReactNode;
};

const SectionHeading = ({ children }: SectionHeadingProps) => {
  return (
    <h2 className='text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
      {children}
    </h2>
    // <h2 className='text-3xl font-medium capitalize mb-8 text-center'>
    //   {children}
    // </h2>
  );
};

export default SectionHeading;
