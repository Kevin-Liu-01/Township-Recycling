import './App.css';
import { Fragment, useState } from 'react'
import { Listbox, Menu, Transition, Disclosure } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { setEnvironmentHealth, setYourPopularity, setTurn } from './storeSlice'

import {
  ChatIcon,
  TruckIcon,
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  GlobeIcon,
  ClipboardListIcon, GlobeAltIcon,
  UsersIcon, UserIcon, ReplyIcon, BriefcaseIcon, LightBulbIcon, TrashIcon, DatabaseIcon,SpeakerphoneIcon, ScaleIcon
} from '@heroicons/react/solid'

const proposals = [
  {
    name: 'Open a new coal mine',
    description:
      'Authorize the construction of a coal mine to increase jobs.',
    icon: <DatabaseIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: 0.07,
    popularity: 2,
  },{
    name: 'Ban gas vehicles',
    description:
      'Gas vehicles will be prohibited in favor of electric vehicles.',
    icon: <TruckIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: -0.11,
    popularity: -16,
  },{
    name: 'Switch to clean energy sources',
    description:
      'Natural gas and petroleum will be slowly switched out for renewable energy sources.',
    icon: <LightBulbIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: -0.10,
    popularity: -12,
  },{
    name: 'Denounce nonrenewable energy',
    description:
      'Criticize nonrenewable energy to the public.',
    icon: <SpeakerphoneIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: -0.01,
    popularity: -2,
  },
  {
    name: 'Open a new recycling plant',
    description:
      'Authorize the construction of a recycling plant to process waste ',
    icon: <TrashIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: -0.03,
    popularity: -1,
  },
  {
    name: 'Support a recycling initiative',
    description:
      'Offer your support to efforts to promote recycling',
    icon: <SpeakerphoneIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: -0.01,
    popularity: 1,
  },
  {
    name: 'Support a new oil pipeline',
    description:
      'Sign off on a new pipeline transporting natural gas',
    icon: <DatabaseIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: 0.09,
    popularity: 6,
  },
  {
    name: 'Promise to reduce CO2 Emissions',
    description:
      'Pledge to reduce CO2 Emissions by 2030',
    icon: <SpeakerphoneIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: -0.05,
    popularity: -2,
  },
  {
    name: 'Reduce oil investments',
    description:
      'Sell government shares of oil corporations',
    icon: <CurrencyDollarIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: -0.06,
    popularity: -8,
  }, {
    name: 'Tax Oil Companies',
    description:
      'Increase the cost of fracking and selling oil',
    icon: <CurrencyDollarIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: -0.08,
    popularity: -12,
  }, {
    name: 'Support new roads and canals',
    description:
      'Construct new roads and canals',
    icon: <TruckIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: 0.03,
    popularity: 3,
  },{
    name: 'Pursue legal action against oil conglomerates',
    description:
      'Hold corporations accountable for ecological damages',
    icon: <ScaleIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: -0.05,
    popularity: -5,
  }, {
    name: 'Fund clean energy proposals',
    description:
      'Offer financial support to alternative energy research',
    icon: <LightBulbIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: -0.09,
    popularity: -9,
  }, {
    name: 'Sell government land to frackers',
    description:
      'Allow oil companies to prospect on state property',
    icon: <DatabaseIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: 0.06,
    popularity: 4,
  }, {
    name: 'Accept political donations from Big Oil',
    description:
      'Fund your campaigns with petrol dollars',
    icon: <BriefcaseIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: 0.03,
    popularity: 2,
  }, {
    name: 'Make recycling mandatory',
    description:
      'Recycling will become mandated across the country',
    icon: <ScaleIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: -0.07,
    popularity: -6,
  }, {
    name: 'Penalize littering',
    description:
      'Littering will become unlawful and punishable by fines',
    icon: <ScaleIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: -0.01 * Math.floor(Math.random() * 2 + 3),
    popularity: -3,
  },{
    name: 'Increase recycling advertising',
    description:
      'Promote recycling efforts and outreach',
    icon: <TrashIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    environment: -0.01 * Math.floor(Math.random() * 2 + 3),
    popularity: 1,
  },

]
const record = [];

function Simulator() {
  const [environmentHealth, setEnvironmentHealth] = useState(1.75)
  const [yourPopularity, setYourPopularity] = useState(10)
  const [turn, setTurn] = useState(1)

  function restart(){
    setEnvironmentHealth(1.75)
    setYourPopularity(10)
    setTurn(1)
    record=[]
  }
  function onChoose(proposalObject) {

    setEnvironmentHealth(environmentHealth + proposalObject.environment)
    setYourPopularity(yourPopularity + proposalObject.popularity)
    record.push(proposalObject)

    setTurn(turn + 1)
  }

  function randomProposal() {
    const randomInt = Math.floor(Math.random() * 18);
    const proposalObject = proposals[randomInt]


    return <div className="grow ml-2 ">
      <div className="grow items-center font-bold text-lg">      {proposalObject.icon} {proposalObject.name}</div>
      <div className="grow items-center "><strong>Description</strong>: {proposalObject.description}</div>
      <div className="grow items-center "><strong>Environmental Impact</strong>:{" "} 
      {proposalObject.environment > 0 ? 
      <div class="inline-block text-red-700"> {proposalObject.environment}</div>
      :
      <div class="inline-block text-green-700"> {proposalObject.environment}</div>
      }
     ° Celsius</div>


      <div className="grow items-center mb-2"><strong>Popularity</strong>: {" "} 
      {proposalObject.popularity > 0 ? 
      <div class="inline-block text-green-700"> {proposalObject.popularity}</div>
      :
      <div class="inline-block text-red-700"> {proposalObject.popularity}</div>
      }</div>


      <button onClick={() => onChoose(proposalObject)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-1100 bg-white hover:bg-green-300 "
      >
        <CheckIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
        Accept Proposal
      </button>
    </div>
  }
  function resultsScreen(){
    return <div className=" flex  flex-col sm:flex-row sm:flex-wrap grow inline items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-100  mt-2 ml-2 mb-2 mr-2 ">
        <div className="text-lg ml-2 mt-2 grow  h-80 items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50  mb-2 mr-2 ">
        <div  className="text-lg ml-2 mt-2">Final temperature increase year by year: {(Math.round(environmentHealth * 100) / 100).toFixed(2) > 0 ? 
      <div class="inline-block text-red-700"> {(Math.round(environmentHealth * 100) / 100).toFixed(2)}</div>
      :
      <div class="inline-block text-green-700"> {(Math.round(environmentHealth * 100) / 100).toFixed(2)}</div>
      }
     ° Celsius</div>
        <div  className="text-lg ml-2 mt-2">Turns taken: {turn}</div>
        <div  className="text-lg ml-2 mt-2">Final popularity: {yourPopularity > 0 ? 
      <div class="inline-block text-green-700"> {yourPopularity}</div>
      :
      <div class="inline-block text-red-700"> {yourPopularity}</div>
      }</div>

        </div>
        <div className="grow  h-80 items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50 mt-2 ml-2 mb-2 mr-2 ">
        {environmentHealth<1.5? <div className="text-lg ml-2 mt-2">You kept the global rise in temperature below 1.5° Celsius.</div>:<div className="text-lg ml-2 mt-2">Tragically, the world is on track to heat up more than 1.5° Celsius.</div>}
        {turn==20 && environmentHealth>1.5? <div className="text-lg ml-2 mt-2">Unfortunately, you were unable to do enough before 20 turns.</div>:<div></div>}
        {yourPopularity>0 ? <div className="text-lg ml-2 mt-2">Thankfully, you preserved your reputation.</div>:<div className="text-lg ml-2 mt-2">You became too unpopular with your constituents.</div>}
        <button onClick={() => restart()}
        className="ml-2 mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-1100 bg-white hover:bg-green-300 "
      >
        <ReplyIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
        Play Again
      </button>
        </div>
        
    </div>
  }

  return (
    <div className="bg-green-200 ">
    <div className="lg:text-center">
      <p className=" text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl mt-3">
        <div >Enviromentalist Leader Simulator</div>
      </p>
      <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-xl text-gray-700">As a world leader, you need to make decisions to protect the environment while satisfying the public and other forces. Make the most strategic decisions as possible within 20 turns while keeping the global temperature rise below 1.5° Celsius.</h1>
      </div>
    </div>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">

                <div className="grow inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <GlobeAltIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                  Temperature increase: {(Math.round(environmentHealth * 100) / 100).toFixed(2)}° Celsius

                </div>
                <div className="grow  inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <ClockIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                  Turn: {turn} of 20

                </div>
                <div className="grow  inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <ChatIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                  Your Popularity: {yourPopularity}

                </div>
              </div>
              <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6 ">
                <div className="mt-2 flex items-center text-sm text-gray-700">
                  <DatabaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-700" aria-hidden="true" />
                  Nonrenewable Resource
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-700">
                  <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-orange-900" aria-hidden="true" />
                  Political/Corporate Interest
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-700">
                  <ScaleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-purple-600" aria-hidden="true" />
                  Law and Order
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-700">
                  <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-700" aria-hidden="true" />
                  Economic Impact
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-700">
                  <TruckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-500" aria-hidden="true" />
                  Transportation
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-700">
                  <TrashIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Recycling
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-700">
                  <SpeakerphoneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-600" aria-hidden="true" />
                  Advocacy
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-700">
                  <LightBulbIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400" aria-hidden="true" />
                  Clean Energy
                </div>
              </div>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">



            </div>
          </div>

          <div className="px-4 py-6 sm:px-0" >
            <div className="overflow-auto object-contain columns-4 border-4 border-dashed border-gray-400 rounded-lg h-96 mt-1 flex  flex-col sm:flex-row sm:flex-wrap sm:mt-0  bg-green-300" >

              {turn == 20 || yourPopularity<=0 ? 
                <>{resultsScreen()}</>
                : <>
                <div className="grow inline items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50 hover:bg-gray-50 mt-2 ml-2 mb-2 mr-2">
                  <div className="object-contain">{randomProposal()}</div>


                </div>
                <div className="grow inline items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50 hover:bg-gray-50 mt-2 ml-2 mb-2 mr-2 ">
                  <div className="object-contain">{randomProposal()}</div>


                </div>
                <div className="grow inline items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50 hover:bg-gray-50 mt-2 ml-2 mb-2 mr-2 ">
                  <div className="object-contain">{randomProposal()}</div>


                </div>
                <div className="grow inline items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50 hover:bg-gray-50 mt-2 ml-2 mb-2 mr-2 ">
                  <div className="object-contain">{randomProposal()}</div>


                </div></>}
            </div>




            <div className="px-4 py-6 sm:px-0 border-4 border-dashed border border-gray-400 rounded-md mt-3 shadow-sm text-sm bg-green-300 " >
              <ClipboardListIcon className="ml-2 inline-block flex-shrink-0  h-5 w-5 text-gray-700 mr-1.5" aria-hidden="true" />
              <div className="inline-block text-lg font-bold text-gray-700 mb-3">
                Your Record</div>
              <div className="break-after-column overflow-auto border-3 border border-gray-300 rounded-lg ml-2 mr-2 h-20 mt-1 flex  flex-col sm:flex-row sm:flex-wrap sm:mt-0  bg-green-50 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >

                {

                  record.map((record) => (
                    <p className="ml-2 items-center isolate">
                      <strong>- Proposal Accepted: </strong>{record.icon}{record.name}

                    </p>
                  ))}

              </div>


            </div>
          </div>
          Version 1.1         </div>
      </main>

    </div>
  )
}

export default Simulator;
