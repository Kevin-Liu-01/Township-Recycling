import './App.css';
import { ClockIcon, CurrencyDollarIcon, TrashIcon, ScaleIcon,ChatIcon } from '@heroicons/react/outline'

const features = [
  
  {
    name: 'Increase recycling rates to 65% ',
    description:
      'Less than 8.7% of plastic is recycled in the United States, for more than 3 million tons of plastic trash generated. As such, the objective of the game is to increase recycling rates by approving proposals that offer beneficial programs.',
    icon: TrashIcon,
  },{
    name: 'Approve proposals based on their impact',
    description:
      'In order to increase the rate of recycling in your town, you must approve certain proposals that support efforts to recycle plastics. However, you may also be offered proposals from corporations that represent their interests.',
    icon: ScaleIcon,
  },
  {
    name: 'You have 20 turns to accept approvals',
    description:
      'Time is running out to save the environment. With so little plastic actually recycled, and our oceans already clogged with millions of tons of plastic waste, you must be able to make a significant enough difference within 20 turns.',
    icon: ClockIcon,
  },
  {
    name: 'Keep your town funded',
    description:
      'While leaders are very powerful, any government must be well-funded in order to produce meaningful change. You must keep your treasury above $0 to avoid bankrupting the town.',
    icon: CurrencyDollarIcon,
  },
]


function Main() {
  return ( <div className="grow py-12 bg-white">
  <div className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="lg:text-center" >
      <h2 className="text-base text-green-400 font-semibold tracking-wide uppercase">Township: Recycling Plastics</h2>
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Game Instructions
      </p>

    </div>

    <div className=" border-4 border-dashed border-gray-300 rounded-lg shadow-sm  mt-10 bg-green-50">
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
