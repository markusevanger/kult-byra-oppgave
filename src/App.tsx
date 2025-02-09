import TimelineItem from "./components/TimelineItem"
import timelineData from "./content.json"
import { Event } from "./components/types"
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { CodeXml } from "lucide-react";



function App() {

  const isMd = useMediaQuery({ minWidth: 768 });


  const [selectedCategory, setSelectedCategory] = useState("default");
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());



  const timeline: Event[] = timelineData as Event[] // importing timeline from content.json
  const timelineSorted = [...timeline].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // sorting based on date of events
  const timelineFilteredByCategory = filterEventsByCategory(timelineSorted, selectedCategory)
  const timelineFilteredByDateRange = filterEventsByDateRange(timelineFilteredByCategory, fromDate, toDate)


  const [leftTimeline, rightTimeline] = splitEveryOther(timelineFilteredByDateRange);
  const datePickerStyle = "border rounded-full px-4 h-full"


  useEffect(() => {
    setFromDate(new Date(timelineFilteredByCategory[0].date))
    setToDate(new Date(timelineFilteredByCategory[timeline.length - 1].date))
  }, [])

  const handleDateChange = (time: string, type: "from" | "to") => {
    const newDate = time ? new Date(time) : new Date();
    if (type === "from") setFromDate(newDate);
    else setToDate(newDate);
  };


  return (
    <div className="w-full overflow-x-clip py-10 px-4">


      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="font-semibold text-4xl">Navn på tidslinje</h1>


        {/* Filter on Category */}
        <div className="flex flex-col sm:flex-row justify-between gap-2">
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

          {/* Date Range Select */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-400">DATO FRA</label>
            <input className={datePickerStyle} type="date"
              value={fromDate.toISOString().split('T')[0]}
              onChange={(e) => handleDateChange(e.target.value, "from")}>
            </input>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-400">DATO TIL</label>
            <input className={datePickerStyle} type="date"
              value={toDate.toISOString().split('T')[0]}
              onChange={(e) => handleDateChange(e.target.value, "to")}>
            </input>
          </div>
        </div>
      </div>

      
      <hr className="mt-10 border border-gray-200"/>


      {/* Timeline content */}
      <div className="w-full flex justify-center">
        {

          // Timeline split into two for larger devices
          isMd ?

            <div className="flex md:max-w-300">
              <ul className="flex flex-col flex-1">
                {leftTimeline.map((event, index) => (
                  <li key={`left-${index}`}>
                    <TimelineItem className={"mt-5"} event={event} datePlacement="right" />
                  </li>
                ))}
              </ul>

              <div className="border-r-1 mt-20" />

              <ul className="mt-60 flex flex-col flex-1">
                {rightTimeline.map((event, index) => (
                  <li key={`right-${index}`}>
                    <TimelineItem className={" mt-20"} event={event} datePlacement="left" />
                  </li>
                ))}
              </ul>
            </div>

            :

            // Timeline for mobile/small devices
            <div className="flex">
              <ul className="flex flex-col flex-1">
                {leftTimeline.map((event, index) => (
                  <li key={`left-${index}`}>
                    <TimelineItem className={"mt-5"} event={event} datePlacement="right" />
                  </li>
                ))}

              </ul>
              <div className="border-r-1 mt-20" />
            </div>
        }

      </div>

      <div className="w-full flex justify-center gap-2">
        <p className="bg-highlightedCard px-4 py-2 rounded-full w-fit mt-12 text-center text-xs font-mono">Laget av <a className="underline" href="https://markusevanger.no" target="_blank">markusevanger.no</a> for <a href="https://kult.design" target="_blank" className="underline">Kult Byrå</a> 🌐</p>
        <p className="flex gap-2 items-center bg-highlightedCard px-4 py-2 rounded-full w-fit mt-12 text-center text-xs font-mono"><CodeXml size={16} /><a className="underline" href="https://github.com/markusevanger/kult-byra-oppgave" target="_blank">Kode</a></p>
      </div>
    </div>
  )
}

export default App







// Helper function for splitting timeline into left/right
function splitEveryOther<T>(list: T[]): [T[], T[]] {
  const list1: T[] = [];
  const list2: T[] = [];

  list.forEach((item, index) => {
    if (index % 2 === 0) list1.push(item);
    else list2.push(item);
  });

  return [list1, list2];
}


// Finds all unique categories dynamically
const getUniqueCategories = (events: Event[]): string[] => {
  const categoriesSet = new Set<string>();
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
    event.category &&
    event.category.some(category => category === validCategory)
  );
};

function filterEventsByDateRange(events: Event[], fromDate: Date, toDate: Date): Event[] {
  return events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= fromDate && eventDate <= toDate;
  });
}
