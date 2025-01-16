import React, { useCallback } from "react";
import { TimelineItem } from "../types/timeline-item";
import TimelineCard from "./TimelineCard";
import { DateTime } from "luxon";

interface TimelineProps {
  data: TimelineItem[];
  showTimeBetween?: boolean;
  hasLineIndicator?: boolean;
}

const Timeline: React.FC<TimelineProps> = ({
  data,
  showTimeBetween,
  hasLineIndicator,
}) => {
  const getSpaceFromPreviousItem = useCallback(
    (item: TimelineItem, previousItem?: TimelineItem) => {
      if (!previousItem) return 0;
      const itemDate = new Date(item.date);
      const previousItemDate = new Date(previousItem.date);
      return DateTime.fromJSDate(itemDate).diff(
        DateTime.fromJSDate(previousItemDate),
        ["days"]
      ).days;
    },
    []
  );
  return (
    <div className="max-w-[1000px] flex flex-row">
      <div
        className={`
        p-4 gap-6 flex flex-col relative
        before:w-[5px] before:bg-gray-300 before:absolute before:inset-0 md:before:mx-auto
        before:top-4 before:bottom-4
        before:ml-6 before:translate-x-1/4 md:before:translate-x-0 before:my-auto
        ${data.length === 1 ? "before:hidden" : ""}
        `}
      >
        {data.map((item, index) => {
          const spaceFromPreviousItem = showTimeBetween
            ? getSpaceFromPreviousItem(item, data[index - 1])
            : undefined;
          return (
            <TimelineCard
              key={item.name}
              data={item}
              spaceFromPreviousItem={spaceFromPreviousItem}
              hasLineIndicator={hasLineIndicator}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
