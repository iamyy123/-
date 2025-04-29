import axios from 'axios';

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

const jsonApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export interface DiaryPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const getPokemon = async (id: number): Promise<Pokemon> => {
  const response = await pokeApi.get(`/pokemon/${id}`);
  console.log("......",response.data);
  return response.data;
};

export const getPokemonList = async (limit = 20, offset = 0) => {
  const response = await pokeApi.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const getDiaryPosts = async (): Promise<DiaryPost[]> => {
  const response = await jsonApi.get('/posts');
  return response.data;
};

export const createDiaryPost = async (post: Omit<DiaryPost, 'id'>): Promise<DiaryPost> => {
  const response = await jsonApi.post('/posts', post);
  return response.data;
};