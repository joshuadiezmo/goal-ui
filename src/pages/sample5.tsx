import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Timeline from "../components/Timeline";
import { TimelineItem } from "../types/timeline-item";

import jsonData from "../assets/sample-4.json"; //TODO [2025-01-16]: should be saved in database
import Filter from "../components/Filter";
import { FilterType } from "../types/filter";
import FilterButton from "../components/FilterButton";
import ShowTimeBetweenBtn from "../components/ShowTimeBetweenBtn";

interface Sample5Props {}

let scrollIntervalTimeout: number | undefined = undefined;

const Sample5: React.FC<Sample5Props> = () => {
  const [dateIndicator, setDateIndicator] = useState("");
  const [showDateIndicator, setShowDateIndicator] = useState(false);
  const [filter, setFilter] = useState<FilterType>({});
  const [showFilter, setShowFilter] = useState(false);
  const [showTimeBetween, setShowTimeBetween] = useState<boolean>(false);

  const compareDate = useCallback((a: TimelineItem, b: TimelineItem) => {
    if (new Date(a.date) < new Date(b.date)) {
      return -1;
    }
    if (new Date(a.date) > new Date(b.date)) {
      return 1;
    }
    return 0;
  }, []);

  const data = useMemo<TimelineItem[]>(
    () => (jsonData as unknown as TimelineItem[]).sort(compareDate),
    [compareDate]
  );

  const filteredData = useMemo<TimelineItem[]>(
    () =>
      data.filter((item) => {
        const date = new Date(item.date);
        if (filter.year) {
          return filter.year === date.getFullYear();
        }

        if (filter.from && filter.to) {
          return (
            filter.from.getTime() < date.getTime() &&
            filter.to.getTime() > date.getTime()
          );
        } else if (filter.to) {
          return filter.to.getTime() > date.getTime();
        } else if (filter.from) {
          return filter.from.getTime() < date.getTime();
        }
        return true;
      }),
    [data, filter.from, filter.to, filter.year]
  );

  const toggleShowTime = useCallback(
    () => setShowTimeBetween((val) => !val),
    []
  );

  const isElementInViewport = useCallback((el: Element) => {
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight ||
          document.documentElement.clientHeight) /* or $(window).height() */ &&
      rect.right <=
        (window.innerWidth ||
          document.documentElement.clientWidth) /* or $(window).width() */
    );
  }, []);

  const onScroll = useCallback(() => {
    if (scrollIntervalTimeout) {
      clearTimeout(scrollIntervalTimeout);
    }
    setShowDateIndicator(true);
    scrollIntervalTimeout = setTimeout(() => {
      setShowDateIndicator(false);
    }, 3000);
    const timelineCards = document.querySelectorAll(".timeline-card");
    let firstElementInViewPort: Element | undefined = undefined;
    timelineCards.forEach((item) => {
      const isInViewport = isElementInViewport(item);
      if (!firstElementInViewPort && isInViewport) {
        firstElementInViewPort = item;
      }
    });
    if (firstElementInViewPort) {
      const itemDate = (firstElementInViewPort as HTMLElement).querySelector(
        ".item-date"
      );
      setDateIndicator(itemDate?.textContent || "");
    } else {
      setDateIndicator("");
    }
  }, [isElementInViewport]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <div className="bg-gray-100 min-h-full flex flex-1 justify-center items-start">
      <div className="p-2">
        <div className="flex flex-row gap-2">
          <FilterButton
            showFilter={showFilter}
            onClick={() => setShowFilter((val) => !val)}
          />
          <ShowTimeBetweenBtn
            showTimeBetween={showTimeBetween}
            onClick={toggleShowTime}
          />
        </div>
        <Filter data={data} onChange={setFilter} show={showFilter} />
        <Timeline
          data={filteredData}
          showTimeBetween={showTimeBetween}
          hasLineIndicator
        />
      </div>
      <div
        className={`
          p-2 bg-white rounded-lg shadow fixed top-5 right-5 transition-all
          border
          ${dateIndicator && showDateIndicator ? "opacity-1" : "opacity-0"}
          `}
      >
        {dateIndicator}
      </div>
    </div>
  );
};

export default Sample5;
