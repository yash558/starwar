import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface EntityDetailsProps {
  entity: {
    name: string;
    birth_year: string;
    films: string[];
    url: string;
    homeworld: string;
    vehicles: string[];
    starships: string[];
  };
}

const EntityDetails: React.FC<EntityDetailsProps> = ({ entity }) => {
  const [filmNames, setFilmNames] = useState<string[]>([]);
  const [homeworld, setHomeworld] = useState<string>('');
  const [vehicleDetails, setVehicleDetails] = useState<string[]>([]);
  const [starshipDetails, setStarshipDetails] = useState<string[]>([]);

  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        const response = await fetch(entity.homeworld);
        const data = await response.json();
        setHomeworld(data.name);
      } catch (error) {
        console.error('Error fetching homeworld:', error);
      }
    };

    const fetchVehicleDetails = async () => {
      try {
        const vehicleDetailsResponse = await Promise.all(entity.vehicles.map(async (vehicleUrl: string) => {
          const response = await fetch(vehicleUrl);
          const vehicleData = await response.json();
          return vehicleData.name;
        }));
        setVehicleDetails(vehicleDetailsResponse);
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      }
    };

    const fetchStarshipDetails = async () => {
      try {
        const starshipDetailsResponse = await Promise.all(entity.starships.map(async (starshipUrl: string) => {
          const response = await fetch(starshipUrl);
          const starshipData = await response.json();
          return starshipData.name;
        }));
        setStarshipDetails(starshipDetailsResponse);
      } catch (error) {
        console.error('Error fetching starship details:', error);
      }
    };

    const fetchFilmNames = async () => {
      try {
        const filmNamesResponse = await Promise.all(entity.films.map(async (filmUrl: string) => {
          const response = await fetch(filmUrl);
          const filmData = await response.json();
          return filmData.title;
        }));
        setFilmNames(filmNamesResponse);
      } catch (error) {
        console.error('Error fetching film names:', error);
      }
    };

    fetchFilmNames();
    fetchHomeworld();
    fetchVehicleDetails();
    fetchStarshipDetails();
  }, [entity.films, entity.homeworld, entity.vehicles, entity.starships]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="p-4">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold text-gray-800">Character Name : {entity.name}</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {
            homeworld.length > 0 &&
            <div className="mb-4">
              <p className="text-sm font-semibold">Home:</p>
              <h1>{homeworld}</h1>
            </div>
          }
          {vehicleDetails.length > 0 &&
            <div className="mb-4">
              <p className="text-sm font-semibold">Vehicles:</p>
              <ul className="list-disc list-inside">
                {vehicleDetails.map((vehicleName, index) => (
                  <li key={index} className="ml-2">{vehicleName}</li>
                ))}
              </ul>
            </div>
          }
          {
            starshipDetails.length > 0 &&
            <div className="mb-4">
              <p className="text-sm font-semibold">Starships:</p>
              <ul className="list-disc list-inside">
                {starshipDetails.map((starshipName, index) => (
                  <li key={index} className="ml-2">{starshipName}</li>
                ))}
              </ul>
            </div>
          }
          {
            filmNames.length > 0 && <div className="mb-4">
              <p className="text-sm font-semibold">Films:</p>
              <ul className="list-disc list-inside">
                {filmNames.map((filmName, index) => (
                  <li key={index} className="ml-2">{filmName}</li>
                ))}
              </ul>
            </div>
          }

          <div>
            <p className="text-sm font-semibold">URL:</p>
            <a href={entity.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{entity.url}</a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EntityDetails;
