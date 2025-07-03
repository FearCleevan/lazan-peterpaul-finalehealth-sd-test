export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dob: string; // YYYY-MM-DD format
  email: string;
  phoneNumber: string;
  address: string;
  dateCreated: string;
  dateUpdated: string;
}