// React Spring
import React, { Suspense, useRef, useState,useEffect } from 'react';
// Page State
// R3F
import { Canvas } from 'react-three-fiber';
import './App.scss';
import Content from './components/Content';
import Header from './components/header';
//Components
import Lights from './components/Lights';
import Loader from './components/Loader';
import { servicesAvailable } from './data/services';
import Description from './components/Description';
const removeSpaces = (string) => {
  let returnString = '';
  returnString = string.split(' ').join('');
  return returnString.replace(/\//g, '');
};

export default function App() {
  const domContent = useRef();

  const [activeService, setActiveService] = useState('automation');
  const [activeServiceObj, setActiveServiceObj] = useState({})
  const getFirstWord = (string) => {
    let returnString = '';
    returnString = string.replace(/ .*/, '');
    console.log(returnString);
    return returnString.toLowerCase();
  };


  
  return (
    <>
      <Header />
      {/* R3F Canvas */}
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
      >
        {/* Lights Component */}
        <Lights />
        <Suspense fallback={null}>
          {/* WebApplication */}
          {activeService === 'web-applications' && (
            <Content
              domContent={domContent}
              bgColor="#f15946"
              modelPath="/tree.gltf"
              meshPosition={[300, -200, -550]}
              groupPositionY={250}
            >
              {servicesAvailable.map((service, id) => (
                <div className="services-catalog" style={{display: 'inline-block'}}>
                  <li
                    onClick={() =>
                      setActiveService(getFirstWord(service.title))
                    }
                    key={id}
                    className={`services ${removeSpaces(service.title)}`}
                  >
                    {service.title}
                  </li>
                </div>
              ))}
              {}
            </Content>
          )}
          {/* SEO */}
          {activeService === 'search' && (
            <Content
              domContent={domContent}
              bgColor="#0b5190"
              modelPath="/littlePlanet.gltf"
              groupPositionY={250}
              meshPosition={[1000, -35, -1000]}
            >
              {servicesAvailable.map((service, id) => (
                <li
                  onClick={() => setActiveService(getFirstWord(service.title))}
                  key={id}
                  className={`services ${removeSpaces(service.title)}`}
                >
                  {service.title}
                </li>
              ))}
            </Content>
          )}
          {/* Automation */}
          {activeService === 'automation' && (
            <Content
              domContent={domContent}
              bgColor="#e96bec"
              modelPath="/robot.gltf"
              groupPositionY={250}
              meshPosition={[40, -15, 30]}
            >
              {servicesAvailable.map((service, id) => (
                <li
                  onClick={() => setActiveService(getFirstWord(service.title))}
                  key={id}
                  className={`services ${removeSpaces(service.title)}`}
                >
                  {service.title}
                </li>
              ))}
            </Content>
          )}
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}