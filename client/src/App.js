
import './App.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from './components/routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function App() {
  const particlesInit = useCallback(async engine => {
  await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    // await console.log(container);
}, []);
  return (
   <React.Fragment>
     <ToastContainer />
     <RouterProvider router={routes}></RouterProvider>

     <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
     
                fpsLimit: 20,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        // resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 0,
                        },
                        repulse: {
                            distance: 300,
                            duration: 8,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#51D80E",
                    },
                    links: {
                        color: "#51D80E",
                        distance: 230,
                        enable: true,
                        opacity: 0.1,
                        width: 3,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: true,
                        speed: 1,
                        straight: true,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 50,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />

   </React.Fragment>
  );
}

export default App;
