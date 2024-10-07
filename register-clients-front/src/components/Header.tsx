import { Link } from "react-router-dom";

const Header = (): JSX.Element => {
    return (
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link
                            to={'/'}
                            className="hover:text-gray-300 transition duration-200"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={'/client/register'}
                            className="hover:text-gray-300 transition duration-200"
                        >
                            Cadastrar
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
