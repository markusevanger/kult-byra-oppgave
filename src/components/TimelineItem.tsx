import { Event } from "./types"; // Adjust the path if needed

export default function TimelineItem({ event }: { event: Event }) {
    return(
        <div className="border rounded-md">
            <div>{event.date}</div>
            <h2>{event.title}</h2>
        </div>
    )
}