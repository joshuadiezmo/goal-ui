import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TimelineItem } from "../types/timeline-item";
import { DateTime } from "luxon";

interface TimelineCardProps {
  isReverse?: boolean;
  data: TimelineItem;
  spaceFromPreviousItem?: number;
  hasLineIndicator?: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  isReverse,
  data,
  spaceFromPreviousItem,
  hasLineIndicator,
}) => {
  const [forceReverse, setForceReverse] = useState(false);
  const shouldReverse = useMemo(
    () => (forceReverse || isReverse) && spaceFromPreviousItem,
    [forceReverse, isReverse, spaceFromPreviousItem]
  );
  const containerRef = createRef<HTMLDivElement>();
  const getOrdinalSuffix = useCallback((day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }, []);

  const displayDate = useMemo(() => {
    const cDate = new Date(data.date);
    return DateTime.fromJSDate(cDate).toFormat(
      "dd'" + getOrdinalSuffix(cDate.getDate()) + "' MMMM yyyy"
    );
  }, [data.date, getOrdinalSuffix]);

  const checkOverlap = useCallback((rect1: DOMRect, rect2: DOMRect) => {
    const overlap = !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
    return overlap;
  }, []);

  useEffect(() => {
    if (hasLineIndicator && !forceReverse) {
      setTimeout(() => {
        const currentRect = containerRef.current
          ?.querySelector(".timeline-card")
          ?.getBoundingClientRect();
        const previousSibling =
          containerRef.current?.previousElementSibling?.querySelector(
            ".timeline-card"
          );
        const previousRect = previousSibling?.getBoundingClientRect();
        if (currentRect && previousRect) {
          setForceReverse(checkOverlap(previousRect, currentRect));
        }
      }, 100);
    }
  }, [
    checkOverlap,
    data.name,
    spaceFromPreviousItem,
    hasLineIndicator,
    containerRef,
    forceReverse,
  ]);

  return (
    <div
      ref={containerRef}
      id={data.name}
      className={`
        timeline-card-container
        transition-all
        relative flex items-start justify-between md:justify-normal group is-active
        ${shouldReverse ? "" : "md:flex-row-reverse"}
        ${spaceFromPreviousItem && hasLineIndicator ? "md:-mt-[15%]" : ""}
        `}
      style={{
        paddingTop: spaceFromPreviousItem,
      }}
    >
      <div
        className={`
          self-center relative
          justify-center w-6 h-6 md:order-2 z-10
          ${shouldReverse ? "md:translate-x-5" : "md:-translate-x-5"}
          after:w-8 md:after:w-11 after:h-[5px] after:bg-gray-300 after:absolute after:-z-[1]
          after:translate-y-[10px] ${
            shouldReverse ? "md:after:-translate-x-5" : ""
          }
        ${!hasLineIndicator ? "after:hidden" : ""}
        `}
      >
        <div className="rounded-full border-4 border-white bg-gray-300 shadow w-full h-full absolute inset-0" />
      </div>
      <div
        style={{ borderColor: data.color }}
        className={`
          timeline-card bg-white shadow rounded-lg p-4 w-[calc(100%-2rem)] md:w-[calc(50%-2rem)]
          border-r-[13px] relative transition-all
          `}
      >
        <div
          className={`
        justify-center w-6 h-[calc(50%)] bg-gray-100 md:order-1
        hidden group-first:flex group-last:flex
        absolute group-last:bottom-0 group-first:top-0
          ${
            shouldReverse
              ? "md:right-0 -translate-x-[calc(100%+2rem)] md:translate-x-[calc(100%+2rem)]"
              : "left-0 -translate-x-[150%]"
          }
        `}
        />
        <h1 className="font-bold text-base">{data.name}</h1>
        <span className="text-base text-[#7B7B7B] item-date">
          {displayDate}
        </span>
        <p className="text-base italic font-[100]">{data.description}</p>
      </div>
    </div>
  );
};

export default TimelineCard;
