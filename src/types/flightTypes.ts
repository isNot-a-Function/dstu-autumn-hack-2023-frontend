export interface flightsData {
  flights: flightsDataItem[];
}

export interface flightsDataItem {
  arrivalPoint: string;
  arrivalTime: string;
  arrivalDate: string;
  departureDate: string;
  departurePoint: string;
  distance: number;
  minCost: number;
  carrriages: {
    carriageNumber: number;
    id: number;
    places: {
      cost: number;
      free: boolean;
      id: number;
      placeNumber: number;
      position: string;
      side: boolean;
      ticket: any;
      ticketId: number;
      recomendationScore: number;
    }[];
    type: string;
  }[];
  freePlacesCount: {
    coupe: number;
    lux: number;
    reserved: number;
    restaurant: number;
    sitting: number;
    staff: number;
    sv: number;
  };
  train: { name: string };
  trainName: string;
  travelTime: number;
  id: number;
}

export interface flightPlace {
  cost: number;
  free: boolean;
  id: number;
  placeNumber: number;
  position: string;
  side: boolean;
  ticket: any;
  ticketId: number;
}

export interface Place {
  id: number;
  place: {
    carriage: {
      type: string;
      carriageNumber: number;
      id: number;
    };
  };
  free: boolean;
  placeNumber: number;
  position: string;
  side: boolean;
}


