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
    <div className="p-4">

      {/* Header */}
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Navn på tidslinje</h1>
        <div className="flex">
          <div className="flex flex-col">
            <label className="text-xs text-gray-400">FILTRER PÅ KATEGORI</label>
            <select
              value={selectedCategory}  // Ensure only one value is selected
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
      <div className="w-full flex justify-center">
        {
          isMd ?
            <div className="flex p-8 md:max-w-300">
              <ul className="flex flex-col flex-2">{splitTimeline[0].map((event: Event, index: number) => <TimelineItem dataPlacement="right" key={index} event={event} />)}</ul>
              <div className="border-r-1" />
              <ul className="mt-20 flex flex-col flex-2">{splitTimeline[1].map((event: Event, index: number) => <TimelineItem dataPlacement="left" key={index} event={event} />)}</ul>
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
