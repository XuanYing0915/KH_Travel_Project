import axios from 'axios';
import { useState } from 'react';
import BgSlider from '@/components/attraction/bg-slider';
import { Head } from 'next/document'




const IndexPage = () => {
  return (
  
    <div style={{width:'100vw',height:'200px'}}>
      <BgSlider />

  </div>
  )
};

export default IndexPage;