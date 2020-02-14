import HomePage from '../app/home-page'
import MultiplicationChart from '../app/1F/'
import Clock from '../app/2F/'
import Calculator from '../app/3F/'
import WorldClock from '../app/4F/'
import AQI from '../app/5F/'
import SixtySecGame from '../app/6F/'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/1f',
    name: 'MultiplicationChart',
    component: MultiplicationChart,
  },
  {
    path: '/2f',
    name: 'Clock',
    component: Clock,
  },
  {
    path: '/3f',
    name: 'Calculator',
    component: Calculator,
  },
  {
    path: '/4f',
    name: 'WorldClock',
    component: WorldClock,
  },
  {
    path: '/5f',
    name: 'AQI',
    component: AQI,
  },
  {
    path: '/6f',
    name: 'SixtySecGame',
    component: SixtySecGame,
  },
]

export default routes;
