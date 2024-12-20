import React from 'react';
import HomepageHeader from '../Shared/Homepageheader';
import Homepagefooter from '../Shared/Homepagefooter';



function CommonLayout({children}) {
  return (
    <div >
       <HomepageHeader />
         {children}
      <Homepagefooter />
    </div>        
  );
}

export default CommonLayout;