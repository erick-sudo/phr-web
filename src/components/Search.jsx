import React, { useEffect, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { joinArrays } from "../assets/utils";

function Search({ placeholder, className }) {
  return (
    <div className="relative flex flex-grow">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className={`peer block w-full focus:outline-emerald-500/100 rounded-full border border-gray-200 py-3 px-10 text-sm outline-2 placeholder:text-gray-500 ${className}`}
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      <button className="absolute border justify-center right-2 top-1/2 h-[35px] w-[35px] -translate-y-1/2 peer-focus:text-gray-900 bg-emerald-500/50 text-emerald-800 hover:bg-emerald-800 hover:text-white flex items-center rounded-full">
        <AdjustmentsHorizontalIcon height={20} />
      </button>
    </div>
  );
}

export function Search2({ handleSearch, placeholder, className }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    if (q) {
      handleSearch(q);
    }
  }, [q]);

  return (
    <div className="relative flex grow">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className={`peer block w-full focus:outline-emerald-500/100 rounded-lg border border-gray-200 py-1 px-10 text-sm outline-2 placeholder:text-gray-500 ${className}`}
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

export function LazySearch({
  receiveSelection,
  childHoverClassName,
  placeholder,
  className,
  endpoint,
  fieldNames = [],
}) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const fetchItems = (search) => {
    if (fieldNames?.length > 0) {
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: search,
          field_names: fieldNames,
        }),
      })
        .then((res) => res.json())
        .then((res) => setItems(res));
    }
  };

  useEffect(() => {
    if (search) {
      fetchItems(search);
    } else {
      setItems([]);
    }
  }, [search]);

  return (
    <div className={`relative h-12 ${className}`}>
      <div className="absolute bg-white rounded-md overflow-hidden left-0 right-0 top-0 grip gap-4 py-2 px-2">
        <div className="relative flex grow">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`peer block w-full outline-none  py-1 px-10 text-sm outline-2 placeholder:text-gray-500`}
            placeholder={placeholder}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <div className="grid gap-2 pl-1">
          {items.map((item, idx) => (
            <div
              onClick={() => {
                if (typeof receiveSelection === "function") {
                  receiveSelection(item);
                  setItems([]);
                  setSearch("");
                }
              }}
              className={`border-l-4 px-4 py-1 cursor-pointer ${childHoverClassName}`}
              key={idx}
            >
              {fieldNames.map((field, idx2) => (
                <div className="" key={idx2}>
                  {joinArrays(
                    `${item[field]}`,
                    search,
                    "bg-emerald-700 text-white"
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
