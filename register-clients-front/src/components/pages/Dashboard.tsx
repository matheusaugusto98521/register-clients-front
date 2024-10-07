import { useState } from "react";
import { useClients } from "../../hooks/GetClients";
import { deleteClient, getClientById, updateClient } from "../../utils/ClientsUtils";
import { Client } from "../../utils/types/Client";
import Header from "../Header";
import Modal from "../Modal";

const Dashboard = () => {
    const { clients, fetchClients } = useClients();
    const [client, setClient] = useState<Client | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [idClient, setIdClient] = useState<string>('');

    const handleDelete = async (idClient: string) => {
        const response = await deleteClient(idClient);
        alert(response);
        fetchClients();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }) as Client);
    };

    const handleEditOpenModal = async (idClient: string) => {
        setIsModalOpen(true);
        setIdClient(idClient);
        await fetchClientById(idClient);
    };

    const fetchClientById = async (idClient: string) => {
        const response = await getClientById(idClient);
        setClient(response);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (client) {
            const response = await updateClient(idClient, client);
            alert(response);
            fetchClients();
            setClient(null);
            setIsModalOpen(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="container mx-auto p-4">
            <Header />
            <h1 className="text-2xl font-bold mb-4 text-center">Clientes</h1>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200 text-gray-600">
                        <th className="p-4">Nome</th>
                        <th className="p-4">Telefone</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Ocupação</th>
                        <th className="p-4">Data de nascimento</th>
                        <th className="p-4">Documento</th>
                        <th className="p-4">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clients && clients.length > 0 ? (
                        clients.map(client => (
                            <tr key={client.id} className="border-b hover:bg-gray-100">
                                <td className="p-4">{client.name}</td>
                                <td className="p-4">{client.phone}</td>
                                <td className="p-4">{client.email}</td>
                                <td className="p-4">{client.occupation}</td>
                                <td className="p-4">{client.birthDate}</td>
                                <td className="p-4">{client.document}</td>
                                <td className="p-4">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleEditOpenModal(client.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                        onClick={() => handleDelete(client.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center p-4">Nenhum cliente encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {isModalOpen && client && (
                <Modal>
                    <div className="relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            aria-label="Fechar modal"
                        >
                            ✖️
                        </button>
                        <h2 className="text-lg font-bold mb-4">Editar Cliente</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <label className="block">
                                Nome:
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nome"
                                    value={client.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                                    required
                                />
                            </label>

                            <label className="block">
                                Documento:
                                <input
                                    type="text"
                                    name="document"
                                    value={client.document}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                                    required
                                />
                            </label>

                            <label className="block">
                                Ocupação:
                                <input
                                    type="text"
                                    name="occupation"
                                    placeholder="Ocupação"
                                    value={client.occupation}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                                    required
                                />
                            </label>

                            <label className="block">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={client.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                                    required
                                />
                            </label>

                            <label className="block">
                                Telefone:
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Telefone"
                                    value={client.phone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                                    required
                                />
                            </label>

                            <label className="block">
                                Data de nascimento:
                                <input
                                    type="date"
                                    name="birthDate"
                                    id="birthDate"
                                    value={client.birthDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                                    required
                                />
                            </label>

                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Atualizar</button>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Dashboard;
