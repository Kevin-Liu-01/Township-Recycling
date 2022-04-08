import './App.css';
import { Fragment, useState } from 'react'
import { Listbox, Menu, Transition, Disclosure } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { setRecyclingPercentage, setYourMoney, setTurn } from './storeSlice'

import {
  ChatIcon,
  ChartSquareBarIcon,
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CursorClickIcon,
  TemplateIcon,
  ClipboardListIcon, GlobeAltIcon,
  UsersIcon, UserIcon, ReplyIcon, BriefcaseIcon, LightBulbIcon, TrashIcon, DatabaseIcon, SpeakerphoneIcon, ScaleIcon, CodeIcon
} from '@heroicons/react/solid'

const proposals = [
  {
    name: 'Organize a recycling competiton',
    description:
      'Invite Terracycle, a volunteer-based recycling platform, to support a townwide competition to recycle plastics',
    icon: <UsersIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 3,
    money: -5,
  }, {
    name: 'Ad Campaign (Going Green)',
    description:
      'Pay for ads for Going Green, a movement to increase recycling rates among population centers and decrease fossil fuel usage.',
    icon: <TemplateIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 8,
    money: -10,
  },
  {
    name: 'Awareness Campaign: Going Green',
    description:
      'Promote environmentally friendly and ecologically responsible decisions and lifestyles',
    icon: <UsersIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 3,
    money: -4,
  }, {
    name: 'Ad Campaign (Akula Oil)',
    description:
      'Pay for ads for Akula Oil, an oil conglomerate that supplies petroleum for plastic production.',
    icon: <TemplateIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: -8,
    money: 7,
  }, {
    name: 'Support Depolymerization Research',
    description:
      'Examine chemical recycling to turn polyester and polystyrene into their raw materials.',
    icon: <LightBulbIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 10,
    money: -20,
  }, {
    name: 'Support Microbial Recycling Research',
    description:
      <div>Examine the <i>Ideonella sakaiensis </i> bacteria, which is able to consume PET plastic.</div>,
    icon: <LightBulbIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 8,
    money: -14,
  }, {
    name: 'Establish a local recycling facility',
    description:
      'Construct a new MRF (Multi-Reuse Facility) to recycle plastics.',
    icon: <DatabaseIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 15,
    money: -20,
  },{
    name: 'Implement RFID systems',
    description:
      'Integrate smart chips to replace traditional recycling symbols and streamline waste management.',
    icon: <ChartSquareBarIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 2,
    money: -4,
  },
  {
    name: 'Support Smart Trash ',
    description:
      'Fund smart receptacles to track residents\' habits and guide municipal actions.',
    icon: <LightBulbIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 3,
    money: -4,
  },{
    name: 'Implement Chemical Recycling',
    description:
      'Use heat and chemical reactions to recycle used plastic into new plastic, fuels, and other chemicals.',
    icon: <TrashIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 5,
    money: -5,
  },{
    name: 'Publish Jobs Report',
    description:
      'Release information about how recycling centers and waste management have increased job growth.',
    icon: <ChartSquareBarIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 4,
    money: -2,
  },
  {
    name: 'Release Economic Data',
    description:
      'Publish statistics regarding economic growth related to recycling projects',
    icon: <ChartSquareBarIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 4,
    money: -2,
  },
  {
    name: 'Manufacturing Negotiations',
    description:
      'Negotiate new contracts with companies to switch to cheaper manufacturing with recycled materials.',
    icon: <BriefcaseIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 3,
    money: -3,
  },
  {
    name: 'Open a new "recycled" park',
    description:
      'Fund a park made completely out of recycled plastics',
    icon: <DatabaseIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 3,
    money: -2,
  },
  {
    name: 'Support recycling initiatives',
    description:
      'Offer your support to efforts to promote plastic recycling',
    icon: <SpeakerphoneIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 1,
    money: -0.5,
  },
  {
    name: 'Install recycling bins in public spaces',
    description:
      'Disperse designated plastic recycling areas throughout public spaces',
    icon: <TrashIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 3,
    money: -1.5,
  },
  {
    name: 'Replace single-use plastics',
    description:
      'Mandate plastic items like bags and straws be switched for their paper alternatives',
    icon: <ScaleIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 3,
    money: -1.5,
  },
  {
    name: 'Reduce Akula Oil investments',
    description:
      'Sell government shares of oil corporations',
    icon: <CurrencyDollarIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 2,
    money: -2,
  }, {
    name: 'Tax single-use plastics',
    description:
      'Additional fees will be charged for using single-use plastics like plastic bags and water bottles',
    icon: <CurrencyDollarIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 2,
    money: 0.5,
  }, {
    name: 'Tax plastic manufacturing',
    description:
      'Tax every ton of plastic produced in local factories',
    icon: <CurrencyDollarIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 3,
    money: -1.5,
  }, {
    name: 'Promote recycling in schools',
    description:
      'Invite plastic recycling advocates to educate students on recycling protocols',
    icon: <UsersIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 5,
    money: -3,
  }, {
    name: 'Accept political favors from Akula Oil',
    description:
      'Fund your campaigns with funding from the chemical industry',
    icon: <BriefcaseIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: -4,
    money: 5,
  }, {
    name: 'Promote recycling to new homeowners ',
    description:
      'Encourage new homeowners, the largest demographic contributing to littering, to recycle',
    icon: <SpeakerphoneIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 3,
    money: -5,
  }, {
    name: 'Promote recycling in local newspaper ',
    description:
      'Raise awareness for plastic recycling and advocacy groups in the local press',
    icon: <TemplateIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 3,
    money: -3,
  }, {
    name: 'Penalize plastic littering',
    description:
      'Littering will become unlawful and punishable by fines',
    icon: <ScaleIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 5,
    money: -5,
  }, {
    name: 'Neighborhood Cleanup Day',
    description:
      'Adopt a new government-sponsored day when residents clean up litter in their communities',
    icon: <UsersIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 3,
    money: -3,
  }, {
    name: 'Incentivize plastic recycling to companies',
    description:
      'Offer tax deductions to companies who adopt recycling-conscious activities',
    icon: <BriefcaseIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 8,
    money: -10,
  }, {
    name: 'Open a Recycled Art Gallery',
    description:
      'Open an exhibition for artistic pieces using discarded and recycled plastics',
    icon: <UsersIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 3,
    money: -2.5,
  }, {
    name: 'Organize an Ocean Cleanup Effort',
    description:
      'Coordinate a townwide event to clear litter from beaches and water sources',
    icon: <UsersIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 3,
    money: -3,
  }, {
    name: 'Ban polyethylene microplastics',
    description:
      'Ban polyethylene microplastics, which often contaminate the oceans and sea life',
    icon: <ScaleIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 6,
    money: -4,
  }, {
    name: 'Open PET recycling facilities',
    description:
      'Introduce facilities to chemically break down PET into raw materials. PET is often used to make water bottles.',
    icon: <DatabaseIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 6,
    money: -7,
  }, {
    name: 'Open HDPE recycling facilities',
    description:
      'Introduce facilities to shred HDPE into reusable pellets. HDPE is often used to make bins and containers.',
    icon: <DatabaseIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 7,
    money: -8,
  }, {
    name: 'Recycle PVC plastics into flooring',
    description:
      'Partner with flooring companies to recycle PVC plastics into flooring for houses. PVC is often used in tubing.',
    icon: <UsersIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 1.5,
    money: -2,
  }, {
    name: 'Recycle LDPE plastics into garbage cans',
    description:
      'Assist in spreading recycling locations by recycling LDPE plastics. LDPE is often used in dispensing bottles.',
    icon: <TrashIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 2.5,
    money: -2.5,
  }, {
    name: 'Recycle PP plastics into electricity cables',
    description:
      'Improve electrical infrastrucure by recycling PP plastics to produce new wiring. PP plastics are often used in bottle caps.',
    icon: <TrashIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 1.5,
    money: -2.5,
  },
  {
    name: 'Recycle PS plastic into insulation',
    description:
      'Recycle styrofoam products into insulation to heat houses. Styrofoam is often used to make disposable items like cups.',
    icon: <TrashIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 1,
    money: -2,
  }, {
    name: 'Akula Oil Lobby',
    description:
      'Agree to Akula Oil expansion for significant funding',
    icon: <BriefcaseIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: -5.5,
    money: 7,
  }, {
    name: 'Greenlight Plastic Packaging Facilities',
    description:
      'Allow plastic recycling companies to establish factories in your town',
    icon: <DatabaseIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: -6,
    money: 4.5,
  }, {
    name: 'Expand Recycling Services',
    description:
      'Increase funding for local recycling services to expand their operations',
    icon: <TrashIcon className="inline-block -ml-0.5 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />,
    recycling: 7,
    money: -6,
  },

]
const record = [];

function Simulator() {
  const [recyclingPercentage, setRecyclingPercentage] = useState(20)
  const [yourMoney, setYourMoney] = useState(25)
  const [turn, setTurn] = useState(1)
  const [toggle, setToggle] = useState(true)

  function restart() {
    setRecyclingPercentage(20)
    setYourMoney(25)
    setTurn(1)
    record.splice(0, record.length)

  }
  function onChoose(proposalObject) {

    setRecyclingPercentage(recyclingPercentage + proposalObject.recycling)
    setYourMoney(yourMoney + proposalObject.money)
    record.unshift(proposalObject)
    // proposals.splice(proposals.indexOf(proposalObject),1)
    // console.log(proposals.length)
    setTurn(turn + 1)
  }

  function randomProposal() {
    const randomInt = Math.floor(Math.random() * proposals.length);
    const proposalObject = proposals[randomInt]

    return <div className="grow ml-2 w-96 ">
      <div className="grow items-center font-bold text-lg">      {proposalObject.icon} {proposalObject.name}</div>
      <div className="grow items-center "><strong>Description</strong>: {proposalObject.description}</div>
      <div className="grow items-center "><strong>Recycling Impact</strong>:{" "}
        {proposalObject.recycling < 0 ?
          <div class="inline-block text-red-700"> {proposalObject.recycling}%</div>
          :
          <div class="inline-block text-green-700"> {proposalObject.recycling}%</div>
        }
      </div>


      <div className="grow items-center mb-2"><strong>Cost</strong>: {" "}
        {proposalObject.money > 0 ?
          <div class="inline-block text-green-700"> {proposalObject.money}K</div>
          :
          <div class="inline-block text-red-700"> {proposalObject.money}K</div>
        }</div>


      <button onClick={() => onChoose(proposalObject)}
        className="mb-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-1100 bg-white hover:bg-green-300 "
      >
        <CheckIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
        Accept Proposal
      </button>
    </div>
  }
  function toggler() {
    if (turn == 1 && toggle == false) {
      setToggle(true)
    }
    else if (turn == 1 && toggle == true) {
      setToggle(false)
    }
  }
  function resultsScreen() {
    return <div className=" flex  flex-col sm:flex-row sm:flex-wrap grow inline items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-100  mt-2 ml-2 mb-2 mr-2 ">
      <div className={toggle?"text-lg ml-2 mt-2 grow  h-80 items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50  mb-2 mr-2 ":"text-lg ml-2 mt-2 grow  h-40 items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50  mb-2 mr-2 "}>
        <div className="text-lg ml-2 mt-2">Final recycling rate in your community: {(Math.round(recyclingPercentage * 100) / 100).toFixed(2) < 85 ?
          <div class="inline-block text-red-700"> {(Math.round(recyclingPercentage * 100) / 100).toFixed(2)}</div>
          :
          <div class="inline-block text-green-700"> {(Math.round(recyclingPercentage * 100) / 100).toFixed(2)}</div>
        }
          %</div>
        <div className="text-lg ml-2 mt-2">Turns taken: {turn}</div>
        <div className="text-lg ml-2 mt-2">Remaining Funds: {yourMoney > 0 ?
          <div class="inline-block text-green-700"> {yourMoney}K</div>
          :
          <div class="inline-block text-red-700"> {yourMoney}K</div>
        }

        </div>
      </div>
      <div className={toggle?"grow  h-80 items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50 mt-2 ml-2 mb-2 mr-2 ":"grow  h-40 items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50 mt-2 ml-2 mb-2 mr-2 "}>
        {recyclingPercentage >= 85 ? <div className="text-lg ml-2 mt-2">You got the recycling rate in your community above 85%.</div> : <div className="text-lg ml-2 mt-2">Unfortunately, did you not increase recycling rates in your community enough.</div>}
        {turn == 20 && recyclingPercentage < 85 ? <div className="text-lg ml-2 mt-2">You were unable to increase recycling rates enough before 20 turns.</div> : <div></div>}
        {yourMoney > 0 ? <div className="text-lg ml-2 mt-2">Thankfully, you did not spend too much money.</div> : <div className="text-lg ml-2 mt-2">You spent too much money and bankrupted the government.</div>}
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
        <p className=" lg:text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl mt-3">
          <div className="text-center">Township: Recycling Plastics</div>
        </p>
        <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
          <h1 className="text-xl text-gray-700">As the mayor of a small town, you must bring the plastic recycling rate of your community up to 85%. Over 20 turns, you must approve various proposals to increase the plastic recycling rate of the town, while also keeping the town government funded. Your decisions will appear in the record section.</h1>
        </div>
      </div>

      <main>
        <div className=" max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className=" border-2 border border-gray-400 rounded-lg bg-green-300 lg:flex lg:items-center lg:justify-between">
            <div className="mt-2 ml-2 mb-2 mr-2 flex-1 min-w-0">
              <div className="mt-1  mb-2 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">

                <div className="grow inline-flex items-center px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <GlobeAltIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                  Recycling Rate:  {recyclingPercentage < 85 ?
                    <div class="ml-1 inline-block text-red-700">  {(Math.round(recyclingPercentage * 100) / 100).toFixed(2)}%</div>
                    :
                    <div class="ml-1 inline-block text-green-700">  {(Math.round(recyclingPercentage * 100) / 100).toFixed(2)}%</div>}

                </div>
                <div className="grow inline-flex items-center px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <ClockIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                  Turn: {turn} of 20

                </div>
                <div className="grow inline-flex items-center px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <CurrencyDollarIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                  Town Treasury: {yourMoney > 0 ?
          <div class="ml-1 inline-block text-green-700"> {yourMoney}K</div>
          :
          <div class="ml-1 inline-block text-red-700"> {yourMoney}K</div>
        }

                </div>
                <button className={turn == 1 ? "text-center  flex items-center text-sm text-gray-700 border-2 border-gray-400 rounded-md bg-gray-200 hover:bg-green-50" : "flex text-center  items-center text-sm text-gray-400 border-2 border-gray-300 rounded-md bg-gray-100"} onClick={() => toggler()}>
                  <CursorClickIcon className="ml-2 flex-shrink-0 mr-0.5 h-4 w-4 text-black-400" aria-hidden="true" /><div className="ml-0.5  mb-0.5 mt-0.5 mr-2.5"> Expand</div>
                </button>
              </div>
              <div className="h-10 items-center text-center grow border-2 border border-gray-300 rounded-lg bg-white mt-3 mb-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6 ">
                <div className="mt-1.5 mb-1.5 ml-4 flex-shrink-0 flex items-center text-sm text-gray-700">
                  <DatabaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-700" aria-hidden="true" />
                  Infrastructure
                </div>
                <div className="mt-1.5 mb-1.5  flex-shrink-0 flex items-center text-sm text-gray-700">
                  <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-orange-700" aria-hidden="true" />
                  Corporate Interest
                </div>
                
                
                <div className="mt-1.5 mb-1.5 flex-shrink-0  flex items-center text-sm text-gray-700">
                  <ScaleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-orange-500" aria-hidden="true" />
                  Legislation
                </div>
                <div className="mt-1.5 mb-1.5 flex-shrink-0  flex items-center text-sm text-gray-700">
                  <TemplateIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-600" aria-hidden="true" />
                  Promotional Material
                </div>
                <div className="mt-1.5 mb-1.5 flex-shrink-0 flex items-center text-sm text-gray-700">
                  <LightBulbIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400" aria-hidden="true" />
                  Research
                </div>
                
                <div className="mt-1.5 mb-1.5 flex-shrink-0  flex items-center text-sm text-gray-700">
                  <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-700" aria-hidden="true" />
                  Finances
                </div>
                <div className="mt-1.5 mb-1.5 flex-shrink-0 flex items-center text-sm text-gray-700">
                  <SpeakerphoneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-800" aria-hidden="true" />
                  Advocacy
                </div>
                <div className="mt-1.5 mb-1.5 flex-shrink-0 flex items-center text-sm text-gray-700">
                  <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-purple-400" aria-hidden="true" />
                  Community
                </div>
                <div className="mt-1.5 mb-1.5 flex-shrink-0  flex items-center text-sm text-gray-700">
                  <TrashIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-600" aria-hidden="true" />
                  Recycling
                </div>
                
              
                
                
                
              </div>
            </div>
            
          </div>

          <div className={toggle ? "grow px-4 py-6 sm:px-0" : "grow columns-2 px-4 py-6 sm:px-0"} >
            <div className="grow min-w-2xl overflow-auto object-contain columns-4 border-4 border-dashed border-gray-400 rounded-lg h-96 mt-1 flex  flex-col sm:flex-row sm:flex-wrap sm:mt-0  bg-green-300" >

              {turn == 20 || yourMoney <= 0 || recyclingPercentage > 85 || recyclingPercentage <= 10 ?
                <>{resultsScreen()}</>
                : <>
                  <div className="grow  inline items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50 hover:bg-gray-50 mt-2 ml-2 mb-2 mr-2">
                    <div className="object-contain overflow-auto">{randomProposal()}</div>


                  </div>
                  <div className="grow inline items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50 hover:bg-gray-50 mt-2 ml-2 mb-2 mr-2 ">
                    <div className="object-contain overflow-auto">{randomProposal()}</div>


                  </div>
                  <div className="grow inline items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50 hover:bg-gray-50 mt-2 ml-2 mb-2 mr-2 ">
                    <div className="object-contain overflow-auto">{randomProposal()}</div>


                  </div>
                  <div className="grow inline items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-50 hover:bg-gray-50 mt-2 ml-2 mb-2 mr-2 ">
                    <div className="object-contain overflow-auto">{randomProposal()}</div>


                  </div></>}
            </div>




            <div className={toggle ? "grow h-72 px-4 py-6 sm:px-0 border-4 border-dashed border-4 border-gray-400 rounded-md mt-3 shadow-sm text-sm bg-green-300 " : "grow h-96 px-4 py-6 sm:px-0 border-4 border-dashed border-4 border-gray-400 rounded-md mt-3 shadow-sm text-sm bg-green-300 "} >
              <ClipboardListIcon className="mb-1 ml-2 inline-block flex-shrink-0  h-5 w-5 text-gray-700 mr-1.5" aria-hidden="true" />
              <div className="inline-block text-lg font-bold text-gray-700 mb-3">
                Your Record</div>
              <div className={toggle ? "h-48 break-after-column overflow-auto border-2 border-gray-400 rounded-lg ml-2.5 mr-2.5 mt-1 flex  sm:flex-wrap sm:mt-0  bg-green-50 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" : "h-72 break-after-column overflow-auto border-2 border-gray-400 rounded-lg ml-2.5 mr-2.5 mt-1 flex  sm:flex-wrap sm:mt-0  bg-green-50 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"} >
                <div>
                  {

                    record.map((record) => (
                      <div className="ml-2 ">
                        <strong>- Proposal Accepted: </strong>{record.icon}{record.name}

                      </div>
                    ))}
                </div>
              </div>


            </div>
          </div >
          <div className="items-center text-center">Version 1.2</div>       </div>
      </main>

    </div>
  )
}

export default Simulator;
