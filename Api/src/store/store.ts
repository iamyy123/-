import { create } from 'zustand';
import { Pokemon } from '../services/api';

interface TrainerState {
  name: string;
  collectedPokemon: Pokemon[];
  setName: (name: string) => void;
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (pokemonId: number) => void;
}

export const useTrainerStore = create<TrainerState>((set) => ({
  name: '小智',
  collectedPokemon: [],
  setName: (name) => set({ name }),
  addPokemon: (pokemon) =>
    set((state) => ({
      collectedPokemon: [...state.collectedPokemon, pokemon],
    })),
  removePokemon: (pokemonId) =>
    set((state) => ({
      collectedPokemon: state.collectedPokemon.filter((p) => p.id !== pokemonId),
    })),
}));