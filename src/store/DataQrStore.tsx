import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';

// Interface para el objeto dataQR
interface DataQR {
    id: string;
    dataQRContent: string;
    date: string;
    country: string;
    city : string;
    coords: {
        latitude: number;
        longitude: number;
    }
}

// Interface para el store DataQrStore
interface DataQrStore {
    dataQRs: DataQR[];
    addDataQR: (dataQR: Partial<DataQR>) => void;
    updateDataQR: (id: string, newData: Partial<DataQR>) => void;
    removeDataQR: (id: string) => void;
}

// Create store DataQrStore
export const useDataQrStore = create<DataQrStore>()(
    devtools(
        persist(
            (set) => ({
                dataQRs: [
                    {
                        id: '1',
                        dataQRContent: 'Data QR 1',
                        date: new Date().toISOString(),
                        country: 'Colombia',
                        city : 'Perímetro Urbano Santiago de Cali',
                        coords: {
                            latitude: 3.450099,
                            longitude: -76.5485156
                        }
                    },
                    {
                        id: '2',
                        dataQRContent: 'Data QR 2',
                        date: new Date().toISOString(),
                        country: 'Colombia',
                        city : 'Perímetro Urbano Santiago de Cali',
                        coords: {
                            latitude: 3.392099,
                            longitude: -76.5485156
                        }
                    },
                    {
                        id: '3',
                        dataQRContent: 'Data QR 3',
                        date: new Date().toISOString(),
                        country: 'Colombia',
                        city : 'Perímetro Urbano Santiago de Cali',
                        coords: {
                            latitude: 3.342099,
                            longitude: -76.5285156
                        }
                    }
                ],
                addDataQR: (dataQR) =>
                    set((state) => ({
                        dataQRs: [...state.dataQRs, dataQR as DataQR],
                    })),
                updateDataQR: (id, newData) =>
                    set((state) => ({
                        dataQRs: state.dataQRs.map((dataQR) =>
                            dataQR.id === id ? { ...dataQR, ...newData } : dataQR
                        ),
                    })),
                removeDataQR: (id) =>
                    set((state) => ({
                        dataQRs: state.dataQRs.filter((dataQR) => dataQR.id !== id),
                    })),
            }),
            {
                name: 'dataQr-storage',
            }
        )
    )
) 
