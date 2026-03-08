export interface LocationDevice {
  id: string;
  device: {
    id: string;
    name: string;
  };
}

export interface LocationType {
  id: string;
  name: string;
}

export interface Location {
  id: string;
  name: string;
  locationType: LocationType;
  locationDevices: LocationDevice[];
}

export interface LocationResponse {
  data: Location[];
  message: string;
}
