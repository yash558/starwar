import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import EntityDetails from './EntityDetails'; // Import the EntityDetails component

interface EntityTableProps {
  entities: any[];
  onRowClick: (entity: any) => void;
}

const EntityTable: React.FC<EntityTableProps> = ({ entities, onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [entitiesPerPage] = useState<number>(5);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredEntities = entities.filter(entity =>
    entity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastEntity = currentPage * entitiesPerPage;
  const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;
  const currentEntities = filteredEntities.slice(indexOfFirstEntity, indexOfLastEntity);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="entity-table-container bg-opacity-25 backdrop-filter backdrop-blur-lg p-4 rounded-md">
      <Input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-2 mb-4 border w-64 border-gray-300 rounded-md"
      />

      <div className='shadow-md rounded bg-opacity-25 backdrop-filter backdrop-blur-lg'>
        <Table className="dark">
          <TableHeader className="dark:bg-gray-800 rounded-md">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Birth Year</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Height</TableHead>
              <TableHead>Mass</TableHead>
              <TableHead>Eye Color</TableHead>
              <TableHead>Hair Color</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentEntities.map((entity, index) => (
              <TableRow
                key={index}
                onClick={() => onRowClick(entity)} // Trigger onRowClick when a row is clicked
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{entity.name}</TableCell>
                <TableCell>{entity.birth_year}</TableCell>
                <TableCell>{entity.gender}</TableCell>
                <TableCell>{entity.height} cm</TableCell>
                <TableCell>{entity.mass} kg</TableCell>
                <TableCell>{entity.eye_color}</TableCell>
                <TableCell>{entity.hair_color}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} >
            Previous
          </PaginationPrevious>
          <PaginationContent>
            {Array.from({ length: Math.ceil(filteredEntities.length / entitiesPerPage) }, (_, i) => (
              <PaginationItem key={i} onClick={() => paginate(i + 1)}>
                <PaginationLink>{i + 1}</PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
          <PaginationNext
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </PaginationNext>
        </Pagination>
      </div>
    </div>
  );
};

export default EntityTable;
