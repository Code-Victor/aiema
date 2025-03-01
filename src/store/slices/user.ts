import { StateCreator } from "..";


export interface UserSlice {
  emergencyContacts: {
    id: string;
    name: string;
    phoneNumber: string;
  }[];
  addEmergencyContact: (contact: {
    id: string;
    name: string;
    phoneNumber: string;
  }) => void;
  removeEmergencyContact: (contactId: string) => void;
  expoPushToken?: string;
  setExpoPushToken: (token: string) => void;
}
const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  emergencyContacts: [],
  addEmergencyContact: (contact) => {
    set((state) => ({
      emergencyContacts: [...state.emergencyContacts, contact],
    }));
  },
  removeEmergencyContact: (contactId) => {
    set((state) => ({
      emergencyContacts: state.emergencyContacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  },
  setExpoPushToken: (token: string) => {
    set({
      expoPushToken: token,
    });
  },
});

export default createUserSlice;
