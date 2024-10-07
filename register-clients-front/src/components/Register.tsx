import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerClientUtils } from "../utils/ClientsUtils";
import { Client } from "../utils/types/Client";
import Header from "./Header";

const RegisterClient: React.FC = (): JSX.Element => {
    const [client, setClient] = useState<Client | null>({
        id: '',
        name: '',
        document: '',
        occupation: '',
        email: '',
        phone: '',
        birthDate: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }) as Client);
    };

    const handleRegisterClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (client) {
            try {
                const response = await registerClientUtils(client);
                console.log("Cliente cadastrado com sucesso: ", response);
                navigate('/');
            } catch (error) {
                console.error('Erro: ' + error);
            }
        }
    };

    return (
        <>
            <Header />
            <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md mt-10">
                <h2 className="text-2xl font-semibold text-center mb-6">Cadastrar Cliente</h2>
                <form onSubmit={handleRegisterClient}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={client?.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="document" className="block text-sm font-medium text-gray-700">Documento:</label>
                        <input
                            type="text"
                            name="document"
                            value={client?.document}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">Ocupação:</label>
                        <input
                            type="text"
                            name="occupation"
                            placeholder="Ocupação"
                            value={client?.occupation}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={client?.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone:</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Telefone"
                            value={client?.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Data de Nascimento:</label>
                        <input
                            type="text"
                            name="birthDate"
                            id="birthDate"
                            value={client?.birthDate}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-200"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </>
    );
}

export default RegisterClient;
