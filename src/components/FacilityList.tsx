import type { UseMutateFunction } from "@tanstack/react-query";
import type { Facility } from "@/types";
import FacilityCard from "@/components/FacilityCard";

interface FacilityListProps {
  items: Facility[];
  remove?: UseMutateFunction<Facility, Error, string, unknown>;
}

export default function FacilityList(props: FacilityListProps) {
  const { items, remove } = props;
  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {items.map((item) => (
          <FacilityCard key={item._id} {...item} onRemove={remove} />
        ))}
      </div>
      {items.length === 0 && (
        <p className="text-center text-sm text-gray-500">
          No facilities yet. Add a new one.
        </p>
      )}
    </>
  );
}
