import React, { useCallback, useMemo, useState } from "react";
import Timeline from "../components/Timeline";
import { TimelineItem } from "../types/timeline-item";

import sample2 from "../assets/sample-2.json"; //TODO [2025-01-16]: should be saved in database
import sample3 from "../assets/sample-3.json"; //TODO [2025-01-16]: should be saved in database
import Filter from "../components/Filter";
import { FilterType } from "../types/filter";
import FilterButton from "../components/FilterButton";
import ShowTimeBetweenBtn from "../components/ShowTimeBetweenBtn";

const jsonData = [...sample2, ...sample3]; // combined 2 data for huge list

interface Sample3Props {}

const Sample3: React.FC<Sample3Props> = () => {
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
        <Timeline data={filteredData} showTimeBetween={showTimeBetween} />
      </div>
    </div>
  );
};

export default Sample3;
