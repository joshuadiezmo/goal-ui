import React, { useCallback, useEffect, useState } from "react";
import Timeline from "../components/Timeline";
import { TimelineItem } from "../types/timeline-item";
import axios from "axios";

interface Sample1Props {}

const Sample1: React.FC<Sample1Props> = () => {
  const [data, setData] = useState<TimelineItem[]>([]);
  const compareDate = useCallback((a: TimelineItem, b: TimelineItem) => {
    if (new Date(a.date) < new Date(b.date)) {
      return -1;
    }
    if (new Date(a.date) > new Date(b.date)) {
      return 1;
    }
    return 0;
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios<TimelineItem[]>("/sample-1.json"); //TODO [2025-01-16]: should be saved in database
      setData(data.sort(compareDate));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [compareDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const [nextGoal] = data.filter(
      (data) => new Date(data.date).getTime() - new Date().getTime() > 0
    );
    if (nextGoal) {
      setTimeout(() => {
        const el = document.getElementById(nextGoal.name);
        if (el) {
          window.scrollTo({
            left: 0,
            top: el.offsetTop - 10,
            behavior: "smooth",
          });
        }
      }, 1000);
    }
  }, [data]);

  return (
    <div className="min-w-screen min-h-screen bg-gray-100 flex flex-1 justify-center items-center">
      <Timeline data={data} />
    </div>
  );
};

export default Sample1;
