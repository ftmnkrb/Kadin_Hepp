export interface UserLocation {
  id?: string;
  userId: string;
  location: {
    city: any | null;
    district: any | null;
    hood: any | null;
  };
}
