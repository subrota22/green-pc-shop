import React from 'react';
import { Helmet } from 'react-helmet';
import WaveStart from '../../Shares/Wave/Wave';

const Blogs = () => {
  return (
    <>
      <Helmet><title>Blogs</title></Helmet>

<WaveStart></WaveStart>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 mx-8">
        <div className="card w-full cardbackground shadow-xl">
          <div className="card-body">
            <h2 className="card-title"> Question 1 :   What are the different ways to manage a state in a React application ? </h2>
            <p>
              React's useState is the best option for local state management.
              If you need a global state solution, the most popular ones are Redux and
              MobX. Your choice will depend on the
              size of your project, your needs, and your engineers' expertise.
            </p>
          </div>
        </div>

        <div className="card w-full  cardbackground shadow-xl">
          <div className="card-body">
            <h2 className="card-title"> How does prototypical inheritance work?</h2>
            <p>The Prototypal Inheritance is a feature in javascript used
              to add methods and properties in objects. It is a method by which
              an object can inherit the properties and methods of another object.
              Traditionally, in order to get and set the
              Prototype of an object, we use Object.
              getPrototypeOf and Object.</p>
          </div>
        </div>
        <div className="card w-full  cardbackground shadow-xl">
          <div className="card-body">
            <h2 className="card-title"> What is a unit test? Why should we write unit tests?</h2>
            <p>
              1 * Unist testing:
              Unit Testing is a testing method that tests an individual unit of software in isolation. Unit testing for React Apps means testing an individual React Component. “Unit testing is a great discipline,
              which can lead to 40% – 80% reductions in bug density.”
              2* Use of unit testing :
              Unit Testing is important for React Apps, as it helps in testing the individual functionality of React components
            </p>
          </div>
        </div>

        <div className="card w-full  cardbackground shadow-xl">
          <div className="card-body">
            <h2 className="card-title"> React vs. Angular vs. Vue ?</h2>
            <p>
              Vue  provides higher customizability and hence is easier to learn
              than Angular or React. Further, Vue has an overlap with Angular and React
              with respect to their functionality like the use of components. Hence,
              the transition to Vue from either of the two is an easy option and
              Angular is a highly popular web development
              framework that offers rich user experiences, fast responsiveness, and
              code maintainability.
            </p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Blogs;