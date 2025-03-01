import { StateCreator as ZStateCreator } from "zustand";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

import createUserSlice, { type UserSlice } from "./slices/user";

import { StateStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

const storeStorage = new MMKV();

const mmkvStorage = (storage: MMKV): StateStorage => ({
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
});

// Define the slices and the state creator
type Slices = 
  UserSlice ;
export type StateCreator<T> = ZStateCreator<Slices, [], [], T>;

/**
 * Creates a global store with the given slices
 * @returns A hook to use the store
 * @example
 * const user = useStore((state) => state.user);
 * const updateUser = useStore((state) => state.updateUser);
 * // You can return an object or array
 * const [user, updateUser] = useStore((state) => [state.user, state.updateUser]);
 * @see {@link [Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)}
 */
export const useStore = createWithEqualityFn<Slices>()(
  subscribeWithSelector(
    persist(
      (...a) => ({
        ...createUserSlice(...a),
       
      }),
      {
        name: "nurovant-store",
        storage: createJSONStorage(() => mmkvStorage(storeStorage)),
        partialize: (state) => ({
          expoPushToken: state.expoPushToken,
          emergencyContacts: state.emergencyContacts
        }),
        version: 1.03,
      }
    )
  ),
  shallow
);
