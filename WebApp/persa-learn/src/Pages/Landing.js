import React from "react";
import '../App.css';
import Banner from '../Components/Landing/Banner';
import Achievments from '../Components/Landing/Achievments';
import MastertheEssentials from '../Components/Landing/MastertheEssentials';
import BoostyourSkills from '../Components/Landing/BoostyourSkills';
import BecomeTechProfessional from '../Components/Landing/BecomeTechProfessional';

const Landing = () => {

  return (
    <>
       <Banner />
      <Achievments />
      <MastertheEssentials />
      <BoostyourSkills />
      <BecomeTechProfessional />
    </>
  );
};

export default Landing;
