'use client'
import React,{ useState} from 'react';
import MetaData from './utils/MetaDataGen.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';


const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <MetaData title="Learnify" description="Learnify is a comprehensive learning platform." />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero/>
    </div>
  );
};

export default Page;
