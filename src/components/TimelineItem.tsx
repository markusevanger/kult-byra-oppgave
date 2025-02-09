import { ArrowUpRight, Download } from "lucide-react";
import { Event, Attachment } from "./types";

export default function TimelineItem({ event, datePlacement, className }: { event: Event; datePlacement: "left" | "right", className: string }) {


    const isLeft = datePlacement === "left"
    const isRight = datePlacement === "right"

    const isDefaultType = event.type === "default"
    const isSpecialType = event.type === "special"


    return (
        <div className={`  ${isLeft ? "ml-8" : "mr-8"} ${className}`}>

            {/* Markers on Timeline */}
            <div className={`flex flex-col ${isRight && "items-end"}`}>

                {/* Circle on timeline */}
                <div className={`flex ${isRight && "justify-end"}`}>
                    <hr className={`border-t-1 w-20 translate-y-13 ${isLeft ? "-translate-x-8" : "translate-x-8"}`} />
                </div>

                {/* Circle on timeline */}
                <div className={`bg-black h-4 w-4 rounded-full  aspect-square translate-y-11 ${isLeft ? "-translate-x-10" : "translate-x-10"}`} />

                {/* Date Notch */}
                <div className={`w-full flex  bg-cover ${isSpecialType && "bg-[url(./art.png)]"} ${isRight && "justify-end"}`}>
                    <div className={`${event.type == "special" ? "bg-specialCard" : event.type == "highlighted" ? "bg-highlightedCard" : "bg-white"}  px-8  border border-b-0 p-6 translate-y-0.5 w-fit rounded-tl-md rounded-tr-md text-wrap`}>
                        {formatDate(event.date)}
                    </div>
                </div>
            </div>



            {/* Event Body */}
            <div className={`
                ${event.type == "special" ? "bg-specialCard" : event.type == "highlighted" ? "bg-highlightedCard" : "bg-white"} 
                ${isLeft ? "rounded-tr-md" : "rounded-tl-md"} 
                flex flex-col gap-8 w-full p-8 border rounded-bl-md rounded-br-md`}>

                {/* Image, Categories and Title */}
                <div className={`
                    ${!isDefaultType && "flex-col"}
                    flex gap-8`}>
                    {
                        event.imageUrl &&
                        <img className={`
                            ${isDefaultType ? "aspect-square w-30" : "w-full"}
                             object-cover`} src={event.imageUrl}></img>
                    }
                    <div className="flex flex-col justify-center break-all text-wrap">
                        <ul className="flex gap-1 flex-wrap">
                            {event.category && event.category.map((category: string, index: number) => (
                                <li key={index} className={` ${categoryColors[category]} w-fit p-2 rounded-full text-xs font-semibold`}>{category}</li>
                            ))}
                        </ul>
                        <h2 className="font-semibold text-2xl text-wrap break-all mt-4 ">{event.title}</h2>
                    </div>


                </div>

                <p className="break-normal">{event.description}</p>


                <div className="flex gap-2">
                    {event.attachments && event.attachments.map((attachment: Attachment) => (
                        <button key={attachment.text} className="hover:bg-aksjonercategory text-sm cursor-pointer flex gap-2 items-center border rounded-full p-2 px-4">{attachment.text} {buttonIcon(attachment.icon)}</button>
                    ))}
                </div>

            </div>
        </div>
    )
}




const buttonIcon = (type: "link" | "download") => {
    if (type == "link") return <ArrowUpRight size={16} />
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