import React from 'react';
import CommentList from './CommentList';

export const Page: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-cool-100 text-white shadow-lg">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-3xl font-bold">Foro de Comentarios</h1>
                    <p className="text-gray-200">Espacio para compartir tus ideas</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="bg-cool-300 shadow-md flex-grow p-4">
                    <CommentList />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-cool-200 text-gray-100">
                <div className="flex flex-col container mx-auto px-4 py-4">
                    <p className="text-center">&copy; 2025 Foro de Comentarios</p>
                    <p className="text-center">Desarrollado por</p>
                    <a href="https://github.com/coslatte" target="_blank" rel="noopener noreferrer" className="text-center">Gabriel Paz Ruíz</a>
                    <a href="https://github.com/pedromcd999" target="_blank" rel="noopener noreferrer" className="text-center">Pedro Miguel</a>
                </div>
            </footer>
        </div>
    );
};