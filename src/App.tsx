import TimelineItem from "./components/TimelineItem"
import timelineData from "./content.json"
import { Event } from "./components/types"



function App() {


  const timeline: Event[] = timelineData

  return (
    <div className="p-4">

      {/* Header */}
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Navn på tidslinje</h1>
        <div>
          filter and categories here
        </div>
      </div>


      {/* Timeline content */}
      <div className="flex flex-col">
        <TimelineItem event={timeline[0]}></TimelineItem>
      </div>

    </div>
  )
}

export default App
