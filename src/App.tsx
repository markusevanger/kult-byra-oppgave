import { Layers } from 'lucide-react'
import { useState } from 'react'
import { Code } from './components/code'


function App() {


  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center px-20'>
        <div className='flex flex-col justify-left'>
          <img src='cute-cat-cat.gif' className='w-60 rounded-lg my-20'></img>
          <h1 className='text-2xl font-bold'>👋 Hello!</h1>
          <p>This is a base template for developing in React by <a className='underline' href='https://markusevanger.no'>markusevanger.no</a></p>
          <button className='text-md font-mono bg-cyan-200 rounded-sm w-fit px-10' onClick={() => setCount(count + 1)}>Counter: {count}</button>
        </div>
        <div className='mt-20'>
          <h2 className='text-lg font-bold flex items-center gap-1'><Layers size={20} />Stack</h2>

          <ul className='pl-6 list-disc'>
            <li>Vite</li>
            <li>React</li>
            <li>Tailwind</li>
            <li>Lucide React</li>
          </ul>

          <h2 className='mt-20 text-md font-semibold'> Before you start, consider adding these: </h2>
          <ul className='pl-6 list-disc'>
            <li className=''><a className='underline' href='https://ui.shadcn.com/' target='_blank'>Shadcn</a> - ui lib <Code clickToCopy={true}>npx shadcn@latest init</Code></li>
            <li><a className='underline' href='https://www.i18next.com/' target='_blank'>i18next</a> - language and seperating content <Code clickToCopy={true}>npm install i18next --save</Code></li>
            <li><a className='underline' href='https://motion.dev/' target='_blank'>FramerMotion</a> - animation <Code clickToCopy={true}>npm install motion</Code></li>
          </ul>

          <div className='flex flex-col items-center mt-10'>
            <p>Remember to change the project name in <Code>package.json</Code></p>
            <p className='font-mono bg-cyan-200 w-fit rounded-sm px-2'>GLHF :)</p>
          </div>


        </div>

      </div>

    </>
  )
}

export default App
