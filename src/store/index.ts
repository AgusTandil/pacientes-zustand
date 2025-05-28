
import {create} from 'zustand';
import type { DraftPatient, Patient } from '../types';
import {v4 as uuidv4} from 'uuid'

// Creo Type de pacientes con los tipos de datos
type PatientState = {
patients:Patient[],
addPatient:(data:DraftPatient)=> void
}

// Funcion que me permite pasar del draft de pacientes a paciente para ser grabado en db
const createPatiente = (patient:DraftPatient) : Patient => {
    return {
        ...patient,
        id:uuidv4()
    }
}

// Store, similar al reducer donde van a estar los estados y las funciones de acciones que modifican el estado.
export const usePatientStore = create<PatientState>((set)=> ({
    patients:[],
    addPatient:(data)=>{
        const newPatiente = createPatiente(data)
       set((state)=> ({
            patients:[...state.patients, newPatiente]
       }))
    }
}))