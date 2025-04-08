// GenderSelect.tsx
import { UserSex } from "@/service/interfaces";

const GenderSelect = ({ searchParams, router }: any) => {
  const currentGender = searchParams.get("gender") || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const value = e.target.value;

    if (value) {
      params.set("gender", value);
    } else {
      params.delete("gender");
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <select
      value={currentGender}
      onChange={handleChange}
      className="border border-gray-300 rounded-md text-sm px-2 py-1"
    >
      <option value="">All Genders</option>
      {Object.values(UserSex).map((g) => (
        <option key={g} value={g}>
          {g.charAt(0).toUpperCase() + g.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  );
};

export default GenderSelect;
