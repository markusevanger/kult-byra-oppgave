import TimelineItem from "./components/TimelineItem"
import timelineData from "./content.json"
import { Event } from "./components/types"
import { useMediaQuery } from 'react-responsive';
import { useState } from "react";



function App() {

  const [selectedCategory, setSelectedCategory] = useState("default");

  const timeline: Event[] = timelineData as Event[]
  const timelineSorted = [...timeline].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const timelineFiltered = filterEventsByCategory(timelineSorted, selectedCategory)

  const splitTimeline = splitEveryOther(timelineFiltered)

  const isMd = useMediaQuery({ minWidth: 768 });



  return (
    <div className="w-full overflow-x-clip py-10 px-4">

      {/* Header */}
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Navn på tidslinje</h1>
        <div className="flex">
          <div className="flex flex-col">
            <label className="text-xs text-gray-400">FILTRER PÅ KATEGORI</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-full p-4 min-w-[200px]"
            >
              <option value="default">Alle Kategorier</option>
              {
                getUniqueCategories(timelineSorted).map((category: string) =>
                  <option key={category} value={category}>{category}</option>
                )
              }
            </select>
          </div>
        </div>
      </div>




      {/* Timeline content */}

      <div className="w-full flex justify-center">'
        {/* 
           
            Ideen her er å vise en "to" kolonners tidslinje på 
           
           
           */}
        {
          <div className="flex md:max-w-300">
            <ul className="flex flex-col flex-1">
              {splitTimeline[0].map((event, index) => (
                <li key={`left-${index}`}>
                  <TimelineItem className={""} event={event} datePlacement="right" />
                </li>
              ))}
            </ul>

            <div className="border-r-1" />

            <ul className="mt-60 flex flex-col flex-1">
              {splitTimeline[1].map((event, index) => (
                <li key={`right-${index}`}>
                  <TimelineItem className={""} event={event} datePlacement="left" />
                </li>
              ))}
            </ul>
          </div>

        }

      </div>
    </div>
  )
}

export default App







{/* Helper function for timeline*/ }
function splitEveryOther<T>(list: T[]): [T[], T[]] {
  const list1: T[] = [];
  const list2: T[] = [];

  list.forEach((item, index) => {
    if (index % 2 === 0) list1.push(item);
    else list2.push(item);
  });

  return [list1, list2];
}



const getUniqueCategories = (events: Event[]): string[] => {
  const categoriesSet = new Set<string>();

  // Collect unique categories from the events
  events.forEach(event => {
    if (event.category) {
      event.category.forEach(category => categoriesSet.add(category));
    }
  });

  return [...categoriesSet];
};



const filterEventsByCategory = (events: Event[], validCategory: string): Event[] => {

  if (validCategory === "default") return events
  else return events.filter(event =>
    event.category && // Check if categories exist
    event.category.some(category => category === validCategory) // Check if any category matches valid ones
  );
};
