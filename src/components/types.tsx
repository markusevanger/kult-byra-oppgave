export interface Event {
    date: string;
    category?: string[];
    title: string;
    description?: string;
    attachments?: Attachment[];
    imageUrl?:string;
    type: "default" | "highlighted" |  "special"
  }

export interface Attachment {
  text:string;
  icon:"download"|"link";
  url:string
}