import { useEffect, useState } from "react";
import { Client } from "../utils/types/Client";

const API_URL = 'http://localhost:8090/client';

type UseClientsReturn = {
    clients: Client[] | null;
    fetchClients: () => Promise<void>;
}


export const useClients = (): UseClientsReturn => {

    const [clients, setClients] = useState<Client[] | null>([]); //useState para controlar estado de clientes

    const fetchClients = async() => {
        try {
            const response = await fetch(API_URL + '/', {
                method: 'GET',
            });
            if(!response.ok){
                throw new Error("");
            }

            const data: Client[] = await response.json();
            setClients(data);
        } catch (error) {
            console.log('Erro no servidor ao buscar clientes: ', error);
        }
    }
    useEffect(() => {
        fetchClients();
    }, []);

    return {clients, fetchClients};
}