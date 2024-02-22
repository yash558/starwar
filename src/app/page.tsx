"use client";
import React, { useState, useEffect} from 'react';
import { fetchEntities } from '../apis/api';
import EntityDetails from '@/components/EntityDetails';
import EntityTable from '@/components/EntityTable';
import Image from "next/image";

export default function Home() {

  const [people, setPeople] = useState<any[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null);
  
 // apis to get all data of star wars characters
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

  const handleClose = () => {
    setSelectedPerson(null);
  };

  return (
    <div className="bg-black overflow-hidden">
      <video autoPlay loop muted className="absolute inset-0 z-0 w-full min-h-full object-cover">
        <source src="bg.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex flex-col items-center justify-start md:px-12 p-6">
        <Image src="/bgt.png" alt="Star Wars Logo" className="w-48 md:w-64 mb-8" height={500}  width={500}/>        
        <div className="w-full bg-white mb-8">
          <EntityTable entities={people} onRowClick={handlePersonClick} />
        </div>
        {selectedPerson && <EntityDetails entity={selectedPerson} onClose={handleClose} />}
      </div>
    </div>
  );
}
