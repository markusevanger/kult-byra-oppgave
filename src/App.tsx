import TimelineItem from "./components/TimelineItem"
import timelineData from "./content.json"
import { Event } from "./components/types"
import { useMediaQuery } from 'react-responsive';




function App() {


  const timeline: Event[] = timelineData as Event[]
  const timelineSorted = [...timeline].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const splitTimeline = splitEveryOther(timelineSorted)

  const isMd = useMediaQuery({ minWidth: 768 });


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
      <div className="w-full flex justify-center">
        {
          isMd ?
            <div className="flex p-8 md:max-w-300">
              <div className="flex flex-col">{splitTimeline[0].map((event: Event) => <TimelineItem dataPlacement="right" event={event} />)}</div>
              <div className="border-r-1"/>
              <div className="mt-20 flex flex-col">{splitTimeline[1].map((event: Event) => <TimelineItem dataPlacement="left" event={event} />)}</div>
            </div>
            :
            <div>
              {/* Mobile Layout based on normal timeline (assuming its one column.*/}
            </div>
        }

      </div>
    </div>
  )
}

export default App

{/* Helper function for timeline*/ }
function splitEveryOther<T>(list: T[]): [T[], T[]] {
  const list1 = list.map((item, index) => (index % 2 === 0 ? item : undefined)).filter((item): item is T => item !== undefined);
  const list2 = list.map((item, index) => (index % 2 !== 0 ? item : undefined)).filter((item): item is T => item !== undefined);

  return [list1, list2];
}