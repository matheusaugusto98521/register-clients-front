import React from 'react';

type ModalProps = {
    children: React.ReactNode;
};

const Modal = ({ children }: ModalProps): JSX.Element => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                {children}
            </div>
        </div>
    );
};

export default Modal;
