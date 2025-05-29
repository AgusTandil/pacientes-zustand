import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type { DraftPatient, Patient } from "../types";
import { v4 as uuidv4 } from "uuid";

type PatientState = {
  patients: Patient[];
  activeId: Patient["id"];
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  getPatientById: (id: Patient["id"]) => void;
  updatePatient: (data: DraftPatient) => void;
};

const createPatiente = (patient: DraftPatient): Patient => ({
  ...patient,
  id: uuidv4(),
});

export const usePatientStore = create<PatientState>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        activeId: "",
        addPatient: (data) => {
          const newPatiente = createPatiente(data);
          set((state) => ({
            patients: [...state.patients, newPatiente],
          }));
        },
        deletePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter((p) => p.id !== id),
          }));
        },
        getPatientById: (id) => {
          set(() => ({
            activeId: id,
          }));
        },
        updatePatient: (data) => {
          set((state) => ({
            patients: state.patients.map((p) =>
              p.id === state.activeId ? { id: p.id, ...data } : p
            ),
            activeId: "",
          }));
        },
      }),
      {
        name: "patient-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
