import { formatDistanceToNow, parseISO } from "date-fns";
import { lt } from "date-fns/locale";

export const TimeAgo = ({ date }: { date: string }) => {
  let timeAgo = "";

  if (date) {
    const postDate = parseISO(date);
    timeAgo = formatDistanceToNow(postDate, { locale: lt });
  }

  return (
    <p className="text-xs text-sky-400">
      Paskelbta {timeAgo ? timeAgo : "nežinoma"} atgal
    </p>
  );
};
