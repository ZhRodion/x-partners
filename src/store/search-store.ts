import { create } from 'zustand'

interface SearchState {
	searchTerm: string
	setSearchTerm: (searchTerm: string) => void
	loading: boolean
	setLoading: (loading: boolean) => void
}

export const useSearchStore = create<SearchState>(set => ({
	searchTerm: '',
	setSearchTerm: (searchTerm: string) => set({ searchTerm }),
	loading: false,
	setLoading: loading => set({ loading }),
}))
