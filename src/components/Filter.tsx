import { DateTime } from "luxon";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TimelineItem } from "../types/timeline-item";
import useTransitionState from "react-transition-state";
import { FilterType } from "../types/filter";

interface FilterProps {
  data: TimelineItem[];
  show: boolean;
  onChange: (filter: FilterType) => void;
}

const Filter: React.FC<FilterProps> = ({ data, show, onChange }) => {
  const [filter, setFilter] = useState<FilterType>({});
  const [filterState, toggleFilter] = useTransitionState({
    timeout: 150,
    preEnter: false,
  });

  useEffect(() => {
    onChange(filter);
  }, [filter, onChange]);

  useEffect(toggleFilter, [show, toggleFilter]);

  const clearFilter = useCallback(() => setFilter({}), []);
  const yearOptions = useMemo(() => {
    return data
      .map((item) => DateTime.fromJSDate(new Date(item.date)).year)
      .filter((value, index, array) => {
        return array.indexOf(value) === index;
      });
  }, [data]);

  const onYearChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setFilter({ year: parseInt(e.target.value) });
  }, []);

  const onFromChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fromValue = new Date(e.target.value);
    fromValue.setHours(0, 0, 0, 0);
    setFilter((val) => ({
      ...val,
      from: e.target.value ? fromValue : undefined,
      year: undefined,
    }));
  }, []);

  const onToChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const toValue = new Date(e.target.value);
    toValue.setHours(23, 59, 59, 59);
    setFilter((val) => ({
      ...val,
      to: e.target.value ? toValue : undefined,
      year: undefined,
    }));
  }, []);
  return (
    <div
      className={`bg-white rounded-lg shadow p-4 max-w-[500px] mt-2 filter ${filterState.status}`}
    >
      <h1 className="font-bold text-base">Filter Timeline</h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-1 items-center gap-2">
          <span>Filter by Year:</span>
          <select
            className="border rounded-lg border-gray-500 flex-1 p-1"
            onChange={onYearChange}
            value={filter.year || ""}
          >
            <option value="" disabled>
              Select Year
            </option>
            {yearOptions.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <span>Events between:</span>
          <input
            type="date"
            max={
              filter.to && DateTime.fromJSDate(filter.to).toFormat("yyyy-LL-dd")
            }
            className="border rounded-lg border-gray-500 flex-1 p-1"
            onChange={onFromChange}
            value={
              filter.from
                ? DateTime.fromJSDate(filter.from).toFormat("yyyy-LL-dd")
                : ""
            }
          />
          <span>to</span>
          <input
            type="date"
            className="border rounded-lg border-gray-500 flex-1 p-1"
            min={
              filter.from &&
              DateTime.fromJSDate(filter.from).toFormat("yyyy-LL-dd")
            }
            onChange={onToChange}
            value={
              filter.to
                ? DateTime.fromJSDate(filter.to).toFormat("yyyy-LL-dd")
                : ""
            }
          />
        </div>
      </div>
      <div className="flex flex-row justify-end mt-2 gap-2">
        <button
          className="p-1 px-4 rounded-lg border border-blue-500 text-blue-500"
          onClick={clearFilter}
        >
          Clear
        </button>
        <button
          className="p-1 px-4 rounded-lg bg-blue-500 text-white"
          onClick={() => toggleFilter()}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
