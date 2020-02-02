import React from 'react'
import { Link } from 'react-router-dom'
import Character from './Character'

let characters = [
  {
    description: 'Retired Investment Banker from New York',
    image: 'https://placebear.com/300/300'
  },
  {
    description: 'Startup Founder who owns a Tesla Cybertruck',
    image: 'https://placebear.com/300/300'
  },
  {
    description: 'Working Mom with 2 kids living in an appartment',
    image: 'https://placebear.com/300/300'
  },
  {
    description: 'High School English Teacher who rides public transit',
    image: 'https://placebear.com/300/300'
  }
]

// {characters.map((character, idx) => (
//   <Link to="/game">
//     <Character
//       key={idx}
//       description={character.description}
//       image={character.image}
//       handleCharacterSelect={(e) => props.handleCharacterSelect(e, idx)}
//     />
//   </Link>
// ))}

const Home = (props) => (

  <div className="main-content">
    <div className="header bg-primary pt-5 pb-7">
      <div className="container">
        <div className="header-body">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="pr-5">
                <h1 className="display-2 text-white font-weight-bold mb-0">Sim Griddy</h1>
                <h2 className="display-4 text-white font-weight-light">Test your energy resilience when disaster hits.</h2>
                <p className="text-white mt-4">Sim Griddy expertly combines real world crisis scenarios and resilience strategies for power outages.</p>
                <div className="mt-5">
                  <a href="#characters" className="btn btn-default my-2">Play now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row pt-5">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div>
                        <img src="./assets/img/disaster.png" alt="disaster" height="50" width="50" />
                      </div>
                      <h5 className="h3">Disaster</h5>
                      <p>Earthquakes, wildfires, hurricanes, tornadoes and more public safety threats.</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div>
                        <img src="./assets/img/energy.png" alt="energy" height="50" width="50" />
                      </div>
                      <h5 className="h3">Energy</h5>
                      <p>Energy solutions to restore electicity during power outages, such as microgrids and generators.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 pt-lg-5 pt-4">
                  <div className="card mb-4">
                    <div className="card-body">
                      <div>
                        <img src="./assets/img/tradeoffs.png" alt="tradeoffs" height="50" width="50" />
                      </div>
                      <h5 className="h3">Tradeoffs</h5>
                      <p>From simple to complex, you make choices for praparing for and enduring crisis.</p>
                    </div>
                  </div>
                  <div className="card mb-4">
                    <div className="card-body">
                      <div>
                        <img src="./assets/img/resilience.png" alt="resilience" height="50" width="50" />
                      </div>
                      <h5 className="h3">Resilience</h5>
                      <p>See how you score in suriving and helping your community.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon className="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <section id="characters" className="py-6 pb-9 bg-default">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8">
            <h2 className="display-3">Choose your character</h2>
            <p className="lead">
              Learn how to prepare for when natural disasters causes 
              power outages through an interactive game. Each character 
              has varying circumstances. Test your skills in making your 
              community more resilient.  
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="section section-lg pt-lg-0 mt--7">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-3">
                <div className="card card-lift--hover shadow border-0" onClick={(e) => props.handleCharacterSelect(e, 0)}>
                  <div className="card-body py-5">
                    <div>
                      <img src="./assets/img/moneybags.png" alt="moneybages" height="50" width="50" />
                    </div>
                    <h4 className="h3 text-primary text-uppercase">Money Bags</h4>
                    <p className="description mt-3">A retired, widowed investment banker from New York.</p>
                    <div>
                      <span className="badge badge-pill badge-primary">Mansion</span>
                      <span className="badge badge-pill badge-primary">Mercedes-Benz</span>
                      <span className="badge badge-pill badge-primary">Recluse</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card card-lift--hover shadow border-0" onClick={(e) => props.handleCharacterSelect(e, 2)}>
                  <div className="card-body py-5">
                    <div>
                      <img src="./assets/img/mamabear.png" alt="mamabear" height="50" width="50" />
                    </div>
                    <h4 className="h3 text-success text-uppercase">Mama Bear</h4>
                    <p className="description mt-3">Working mom with two kids and two minimum wage jobs.</p>
                    <div>
                      <span className="badge badge-pill badge-success">Multi-family Apartment</span>
                      <span className="badge badge-pill badge-success">Minivan</span>
                      <span className="badge badge-pill badge-success">Invovled</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card card-lift--hover shadow border-0" onClick={(e) => props.handleCharacterSelect(e, 1)}>
                  <div className="card-body py-5">
                    <div>
                      <img src="./assets/img/techie.png" alt="techie" height="50" width="50" />
                    </div>
                    <h4 className="h3 text-warning text-uppercase">The Techie</h4>
                    <p className="description mt-3">Startup founder with successful exit.</p>
                    <div>
                      <span className="badge badge-pill badge-warning">Penthouse</span>
                      <span className="badge badge-pill badge-warning">Tesla Cyber Truck</span>
                      <span className="badge badge-pill badge-warning">Secluded</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card card-lift--hover shadow border-0" onClick={(e) => props.handleCharacterSelect(e, 3)}>
                  <div className="card-body py-5">
                    <div>
                      <img src="./assets/img/teacher.png" alt="teacher" height="50" width="50" />
                    </div>
                    <h4 className="h3 text-warning text-uppercase">Mr. Adams</h4>
                    <p className="description mt-3">Elderly High school english teacher.</p>
                    <div>
                      <span className="badge badge-pill badge-warning">Townhouse</span>
                      <span className="badge badge-pill badge-warning">Public Transit</span>
                      <span className="badge badge-pill badge-warning">Beloved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <script src="./assets/vendor/jquery/dist/jquery.min.js"></script>
    <script src="./assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./assets/vendor/js-cookie/js.cookie.js"></script>
    <script src="./assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js"></script>
    <script src="./assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js"></script>
    <script src="./assets/vendor/onscreen/dist/on-screen.umd.min.js"></script>
    <script src="./assets/js/argon.js?v=1.2.0"></script>
    <script src="./assets/js/demo.min.js"></script>
  </div>
)

export default Home
