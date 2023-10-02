'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Heading from './heading';
import PrivateProfilesCard from './cards/private-profiles-share/private-profiles-card';
import CourseListCard from './cards/course-list/course-list-card';

const pathname = '/analytics';

const navigation = [
  {
    label: 'Předměty',
    id: 'subjects',
    section: () => (
      <>
        <CourseListCard />
      </>
    ),
  },
  {
    label: 'Studenti',
    id: 'students',
    section: () => (
      <>
        <CourseListCard />
      </>
    ),
  },
  {
    label: 'Témata',
    id: 'topics',
    section: () => (
      <>
        <CourseListCard />
      </>
    ),
  },
  {
    label: 'Ostatní',
    id: 'other',
    section: () => (
      <>
        <PrivateProfilesCard />
      </>
    ),
  },
];

export default function AnalyticsHomePage() {
  const [activeId, setActiveId] = useState(navigation[0].id);

  useEffect(() => {
    const itemIds = ['pages', 'students'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: [0.5] }
    );
    itemIds.forEach((id) => {
      const e = document.getElementById(id);
      if (e) observer.observe(e);
    });
    return () => {
      itemIds.forEach((id) => {
        const e = document.getElementById(id);
        if (e) observer.unobserve(e);
      });
    };
  });

  return (
    <div className="flex h-full justify-end">
      <div className="h-screen flex-shrink-0 w-full md:w-52 md:block fixed md:sticky top-0 z-10 hidden">
        <div className="sidebar border-gray-200 flex flex-col justify-between dark:border-gray-900 w-full pr-6 pb-6 pt-2 md:pb-6 h-full overflow-y-auto">
          <ul>
            {navigation.map((item) => (
              <li key={item.id} className="mb-1">
                <Link
                  className={`
                block text-sm py-2 px-4 font-medium whitespace-nowrap hover:bg-white rounded-lg
                ${activeId == item.id ? 'text-text bg-white' : 'text-muted'}`}
                  href={`${pathname}#${item.id}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div id="root" className="w-full max-w-full overflow-x-hidden">
        {navigation.map((item) => {
          if (!item.section) return <></>;
          return (
            <section key={item.id} id={item.id} className="w-full mt-8">
              {item.label && (
                <Heading className="text-2xl mb-4">{item.label}</Heading>
              )}
              {item.section && item.section()}
            </section>
          );
        })}
      </div>
    </div>
  );
}
