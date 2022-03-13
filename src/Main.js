import './App.css';
import { ClockIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon,ChatIcon } from '@heroicons/react/outline'

const features = [
  
  {
    name: 'Keep the global temperature increase below 1.5°C ',
    description:
      'The 2015 Paris agreement saught to limit the rise in average global temperatures to no more than 2°C above pre-industrial levels. The objective of the agreement is to reduce the global rise in temperatures to at most 1.5° C (1.5°C = about 2.7°F of additional warming).',
    icon: GlobeAltIcon,
  },{
    name: 'Approve proposals based on their impact',
    description:
      'In order to protect the environment and prevent the rise in global temperature from exceeding 15°C, you must approve certain proposals that support efforts to preserve the environment. However, you may also be offered proposals from your constituents that represent their interests.',
    icon: ScaleIcon,
  },
  {
    name: 'You have 20 turns to accept approvals',
    description:
      'Time is running out to save the environment. Currently, the world temperature increase since pre-industrial times is 1.21 °C, and we are increasing at a rapid pace of 0.14 °C per year. You must be able to make a significant enough difference within 20 turns.',
    icon: ClockIcon,
  },
  {
    name: 'Keep your popularity above 0%',
    description:
      'While leaders are very powerful, their power rests in the judgement of their constituents. All proposals must have the support of the people, and their support will reflect in how they view you. If your popularity falls below 0, the game is over.',
    icon: ChatIcon,
  },
]


function Main() {
  return ( <div className="grow py-12 bg-white">
  <div className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="lg:text-center" >
      <h2 className="text-base text-green-400 font-semibold tracking-wide uppercase">Enviromentalist Leader Simulator</h2>
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Game Instructions
      </p>

    </div>

    <div className=" border-4 border-dashed border-gray-300 rounded-lg shadow-sm  mt-10">
      <dl className="mt-2 ml-2 mb-2 mr-2 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 bg-green-50">
        {features.map((feature) => (
          <div key={feature.name} className="border border-gray-300 rounded-md shadow-sm relative bg-green-200">
            <dt>
              <div className="mt-2 ml-2 mb-2 mr-4 absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-400 text-white">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 mt-2 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
            </dt>
            <dd className="mt-2 mb-2 ml-16 text-base text-gray-500">{feature.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
</div>
)
        }

export default Main;
