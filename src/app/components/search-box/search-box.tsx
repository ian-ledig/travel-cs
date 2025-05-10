'use client';
import React, { FormEvent, useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import { ja } from 'date-fns/locale';
import type { RangeKeyDict } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type DateRangeType = {
  startDate: Date;
  endDate: Date;
  key: string;
};

const SearchBox = () => {
  const [destination, setDestination] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState<DateRangeType[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const dateRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dateRef.current && !dateRef.current.contains(e.target as Node)
      ) {
        setShowDate(false);
      }
      if (
        guestsRef.current && !guestsRef.current.contains(e.target as Node)
      ) {
        setShowGuests(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-wrap"
    >
      {/* Destination */}
      <div className="flex flex-col">
        <label className="text-sm font-medium">行き先</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="目的地を入力"
          className="border rounded-l-sm px-4 py-1 w-48 border-red"
        />
      </div>

      {/* Dates */}
      <div className="relative" ref={dateRef}>
        <label className="text-sm font-medium block">日付</label>
        <button
          type="button"
          onClick={() => setShowDate(!showDate)}
          className="border px-4 py-1 w-60 text-left border-red"
        >
          {`${format(date[0].startDate, 'yyyy/MM/dd')} - ${format(date[0].endDate, 'yyyy/MM/dd')}`}
        </button>
        {showDate && (
          <div className="absolute z-10 mt-2">
            <DateRange
              locale={ja}
              editableDateInputs={true}
              onChange={(item: RangeKeyDict) => {
                const selection = item.selection;
                if (selection?.startDate && selection?.endDate) {
                  setDate([
                    {
                      startDate: selection.startDate,
                      endDate: selection.endDate,
                      key: 'selection',
                    },
                  ]);
                }
              }}
              moveRangeOnFirstSelection={false}
              ranges={date}
              minDate={new Date()}
            />
          </div>
        )}
      </div>

      {/* Guests */}
      <div className="relative" ref={guestsRef}>
        <label className="text-sm font-medium block">人数</label>
        <button
          type="button"
          onClick={() => setShowGuests(!showGuests)}
          className="border px-4 py-1 w-36 text-left border-red"
        >
          {`${guests}名`}
        </button>
        {showGuests && (
          <div className="absolute z-10 bg-white border rounded shadow mt-2 p-4">
            <div className="flex items-center justify-between">
              <span>ゲスト数</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                  className="px-2 py-1 bg-red rounded"
                >
                  −
                </button>
                <span>{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests((prev) => prev + 1)}
                  className="px-2 py-1 bg-red rounded"
                >
                  ＋
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search button */}
      <div className="self-end">
        <button
          type="submit"
          className="bg-red text-white px-6 py-1 rounded-r-sm cursor-pointer"
        >
          検索
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
