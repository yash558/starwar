"use client";
import React, { useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchEntities } from '../apis/api';
import EntityDetails from '@/components/EntityDetails';
import EntityTable from '@/components/EntityTable';

export default function Home() {
  const router = useSearchParams();
  const [people, setPeople] = useState<any[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEntities('people');
        setPeople(data.results);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    };

    fetchData();
  }, []);

  const handlePersonClick = (entity: any) => {
    setSelectedPerson(entity);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-6">
      <h1 className="text-3xl font-semibold mb-8">Star Wars People</h1>
      <div className="w-full  bg-white mb-8">
        <EntityTable entities={people} onRowClick={handlePersonClick} />
      </div>
      {selectedPerson && <EntityDetails entity={selectedPerson} />}
    </main>
  );
}
