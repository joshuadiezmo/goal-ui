import React, { useCallback, useMemo, useState } from "react";
import Timeline from "../components/Timeline";
import { TimelineItem } from "../types/timeline-item";

import jsonData from "../assets/sample-2.json"; //TODO [2025-01-16]: should be saved in database
import ShowTimeBetweenBtn from "../components/ShowTimeBetweenBtn";

interface Sample2Props {}

const Sample2: React.FC<Sample2Props> = () => {
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

  const toggleShowTime = useCallback(
    () => setShowTimeBetween((val) => !val),
    []
  );

  return (
    <div className="min-w-screen min-h-screen bg-gray-100 flex flex-1 justify-center items-center">
      <div className="p-2">
        <ShowTimeBetweenBtn
          showTimeBetween={showTimeBetween}
          onClick={toggleShowTime}
        />
        <Timeline data={data} showTimeBetween={showTimeBetween} />
      </div>
    </div>
  );
};

export default Sample2;
