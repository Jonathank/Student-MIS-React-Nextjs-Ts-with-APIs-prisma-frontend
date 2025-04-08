"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

const TableSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  // Sync state with URL when it changes
  useEffect(() => {
    const existing = searchParams.get("search") || "";
    setSearchValue(existing);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    params.set("page", "1"); // reset to page 1 on search
    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      <IoIosSearch className="w-5 h-5" />
      <input
        type="text"
        name="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
      {searchValue && (
        <button
          type="button"
          onClick={handleClear}
          className="text-gray-400 hover:text-gray-600 text-lg font-bold"
        >
          ×
        </button>
      )}
    </form>
  );
};

export default TableSearch;
