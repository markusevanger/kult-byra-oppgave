import { Download, Link } from "lucide-react";
import { Event, Attachment } from "./types";

export default function TimelineItem({ event, dataPlacement }: { event: Event; dataPlacement: "left" | "right" }) {

    return (
        <li className={`mb-20 flex flex-col ${dataPlacement == "right" && "items-end"}`}>
            <div className={`flex ${dataPlacement == "right" && "justify-end"}`}>
                <hr className={`border-t-1 w-20 translate-y-10`} />
            </div>

            <div className={`bg-black h-4 w-4 rounded-full  aspect-square translate-y-8 ${dataPlacement == "left" ? "-translate-x-2" : "translate-x-2"}`} />

            <div className={`${dataPlacement == "left" ? "ml-8" : "mr-8"} px-8  border border-b-0 p-6 translate-y-0.25 w-fit bg-white rounded-tl-md rounded-tr-md`}>
                {formatDate(event.date)}
            </div>




            <div className={`${dataPlacement == "left" ? "ml-8" : "mr-8"} flex  flex-col gap-8 w-full p-8 border rounded-bl-md rounded-br-md ${dataPlacement == "left" ? "rounded-tr-md" : "rounded-tl-md"}`}>

                <div className="flex gap-5 ">
                    {
                        event.imageUrl &&
                        <img className="w-40 aspect-square object-cover" src={event.imageUrl}></img>
                    }
                    <div>
                        <div className="flex gap-1">
                            {event.category && event.category.map((category: string) => (
                                <p className={` ${categoryColors[category]} w-fit p-2 rounded-full text-xs font-semibold`} key={category}>{category}</p>
                            ))}
                        </div>
                        <h2 className="font-semibold text-xl text-wrap">{event.title}</h2>
                    </div>


                </div>

                <p>{event.description}</p>


                <div className="flex gap-2">
                    {event.attachments && event.attachments.map((attachment: Attachment) => (
                        <button className="text-sm cursor-pointer flex gap-2 items-center border rounded-full p-2 px-4">{attachment.text} {buttonIcon(attachment.icon)}</button>
                    ))}
                </div>

            </div>
        </li>
    )
}




const buttonIcon = (type: "link" | "download") => {
    if (type == "link") return <Link size={16} />
    else return <Download size={16} />
}




const categoryColors: { [key: string]: string } = {
    "Gallerier": "bg-galleriercategory",
    "Åpninger": "bg-aapningercategory",
    "Fagpolitikk": "bg-fagpolitikkcategory",
    "Aksjoner": "bg-aksjonercategory"
};




const formatDate = (dateString: string): string => {
    const dateParts = dateString.split('-');

    // If only year
    if (dateParts.length === 1) {
        return `${dateParts[0]}`;
    }

    const months = [
        'januar', 'februar', 'mars', 'april', 'mai', 'juni',
        'juli', 'august', 'september', 'oktober', 'november', 'desember'
    ];

    // If year, month and day
    const year = dateParts[0];
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);

    // Format date with day, month and year
    return `${day}. ${months[month - 1]} ${year}`;
};