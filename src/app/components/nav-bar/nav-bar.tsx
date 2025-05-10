import Image from 'next/image';
import React from 'react';
import SearchBox from '../search-box/search-box';

const NavigationBar = () => {
  return (
    <div className="flex justify-between pt-3 pb-3 pl-20 pr-20 shadow-[0_5px_5px_-5px_rgba(0,0,0,0.2)]">
      <Image src="/japan_stay.svg" width={130} height={130} alt="Logo" />
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <SearchBox />
      </div>
      <div>Sign in</div>
    </div>
  );
};

export default NavigationBar;
