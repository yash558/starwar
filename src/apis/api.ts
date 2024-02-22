import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api';

export const fetchEntities = async (category: string, page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/${category}/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchAllEntities = async (category: string) => {
  try {
    let allEntities: any[] = [];
    let page = 1;
    let response = await fetchEntities(category, page);
    allEntities = allEntities.concat(response.results);

    while (response.next) {
      page++;
      response = await fetchEntities(category, page);
      allEntities = allEntities.concat(response.results);
    }

    return allEntities;
  } catch (error) {
    console.error('Error fetching all data:', error);
    throw error;
  }
};
