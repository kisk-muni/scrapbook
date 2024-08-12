'use client';
import { Suspense } from 'react';
import StudentsList from './students';

export default function AnalyticsHomePage() {
  return (
    <Suspense>
      <div className="w-full">
        <StudentsList />
      </div>
    </Suspense>
  );
}
