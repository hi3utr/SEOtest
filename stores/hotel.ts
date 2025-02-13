import { defineStore } from "pinia";
import { useApi } from "../composables/useApi";

interface Hotel {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  amenities: string[];
}

export const useHotelStore = defineStore("hotel", {
  state: () => ({
    hotels: [] as Hotel[],
    selectedHotel: null as Hotel | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchHotels() {
      const api = useApi();
      this.loading = true;
      try {
        this.hotels = await api.get<Hotel[]>("/hotels");
      } catch (err) {
        this.error = "Failed to fetch hotels";
      } finally {
        this.loading = false;
      }
    },

    async getHotelDetails(id: string) {
      const api = useApi();
      try {
        const hotel = await api.get<Hotel>(`/hotels/${id}`);
        this.selectedHotel = hotel;
        return hotel;
      } catch (err) {
        this.error = "Failed to fetch hotel details";
        throw err;
      }
    },

    setSelectedHotel(hotel: Hotel) {
      this.selectedHotel = hotel;
    },
  },

  getters: {
    availableHotels: (state) => state.hotels,
    getHotelById: (state) => {
      return (id: string) => state.hotels.find((hotel) => hotel.id === id);
    },
  },
});
