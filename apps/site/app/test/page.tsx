'use client';
import Button from 'components/input/button';
import FilterSelect from 'components/input/filter-select';
import { CourseOption, courseOptions } from 'lib/data/courses';
import { useState } from 'react';

export default function HomePage() {
  const [value, setValue] = useState<CourseOption[]>([]);

  // in useeffect, if elsewhere contains some element, set value so it contains elements from courseoptions with same value properties

  /*   useEffect(() => {
    if (elsewhere.length > 0) {
      try {
        const parsed = JSON.parse(elsewhere);
        // if element from parsed with same value is not in value yet
        // add it to value

        setValue([
          ...value,
          ...courseOptions.filter(
            (option) =>
              // avoid duplicate values
              !value.some((e) => e.value === option.value) &&
              parsed.some((e) => e.value === option.value)
          ),
        ]);
      } catch (error) {
        return;
      }
    }
  }, [elsewhere, value]); */

  return (
    <div className="h-screen bg-snow flex p-40 flex-col items-center">
      {/*<input
        className="border-1 mb-2"
        value={elsewhere}
        onChange={(e) => setElsewhere(e.target.value)}
      />*/}
      <FilterSelect<CourseOption>
        value={value}
        ariaLabel="Kurz"
        placeholder="Kurz"
        onChange={(v) => setValue([...v])}
        options={courseOptions}
        renderOption={(option) => (
          <div className="py-1">
            <div className="mb-0.5">
              <span className="rounded-md inline-block bg-muted text-white font-medium text-xs leading-tight pt-[2px] pb-[1px] px-1 mr-1">
                {option.code}
              </span>
            </div>
            <div className="leading-tight">{option.label}</div>
          </div>
        )}
        filterPlaceholder="Filtrovat kurzy"
        filterTitle="Filtrovat podle kurzu"
        filterPredicate={(item, query) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.code.toLowerCase().includes(query.toLowerCase())
        }
      />
      <div>
        <pre>{JSON.stringify(value)}</pre>
      </div>
      <Button
        onPress={() => {
          setValue(
            value &&
              (value.filter((e) => e.value !== 'ARTS005') as CourseOption[])
          );
        }}
      >
        Remove ARTS005
      </Button>
    </div>
  );
}
