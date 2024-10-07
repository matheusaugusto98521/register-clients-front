import { Client } from "./types/Client";

const API_URL = 'http://localhost:8080/client';

export const registerClientUtils = async(clientData : Client | null): Promise<Client | null> =>{
    try {
        const response = await fetch(API_URL + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });

        if(response.ok){
            return await response.json() as Client;
        }else{
            throw new Error('Error ao cadastrar cliente');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteClient = async(idClient: string): Promise<string> => {
    try {
        const response = await fetch(API_URL + `/delete?idClient=${idClient}`,{
            method: 'DELETE'
        });

        if(!response.ok){
            const { error } = await response.json();
            throw new Error("Erro ao apagar cliente: " + error);
        }

        return 'Cliente excluído com sucesso';

    } catch (error) {
        console.error('Erro: ', error);
        return 'Erro ao apagar cliente';
    }
};

export const getClientById = async(idClient : string): Promise<Client | null> => {
    try {
        const response = await fetch(API_URL + `/find-by-id?idClient=${idClient}`, {
            method: 'GET'
        });

        if(!response.ok){
            const { error } = await response.json();
            throw new Error("Erro ao resgatar cliente: " + error);
        }

        return await response.json() as Client;
    } catch (error) {
        console.error('Erro: ', error);
        return null;
    }
};

export const updateClient = async(idClient: string, client: Client): Promise<string> => {
    try {
        const response = await fetch(API_URL + `/update?idClient=${idClient}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        });

        if(!response.ok){
            const { error } = await response.json();
            throw new Error("Erro ao resgatar cliente: " + error);
        }

        return `Cliente alterado com sucesso`;
    } catch (error) {
        return '';
    }
};