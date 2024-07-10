import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FaSearch, FaPlus, FaBook, FaEdit, FaTrash, FaDownload, FaFilter, FaTags, FaUserGraduate } from 'react-icons/fa';
import PropTypes from 'prop-types';
import AddBookModal from '../../components/admin/ui/modal/AddBookModal';

const ELibraryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [books, setBooks] = useState([
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', available: 5 },
    { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', available: 3 },
    { id: 3, title: 'Math Principles', author: 'John Smith', category: 'Textbook', available: 10 },
    { id: 4, title: 'World History', author: 'Jane Doe', category: 'Textbook', available: 7 },
  ]);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const handleAddBook = (newBook) => {
    // Add the new book to your books state or send to API
    setBooks([...books, { id: books.length + 1, ...newBook, available: 1 }]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement search logic here
  };

  const handleEditBook = (id) => {
    // Implement edit book logic
  };

  const handleDeleteBook = (id) => {
    // Implement delete book logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">E-Library Management</h1>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search books..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <FaPlus className="mr-2" /> Add New Book
        </button>
        <AddBookModal isOpen={isAddModalOpen} closeModal={closeAddModal} onAddBook={handleAddBook} />
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6 overflow-x-auto">
          {['All Books', 'Textbooks', 'Fiction', 'Non-Fiction', 'References'].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 whitespace-nowrap
                ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <BookTable books={books} onEdit={handleEditBook} onDelete={handleDeleteBook} />
          </Tab.Panel>
          {/* Add similar Tab.Panel components for other categories */}
        </Tab.Panels>
      </Tab.Group>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Books" value={books.length} icon={<FaBook className="text-blue-500" />} />
        <StatCard title="Available Books" value={books.reduce((sum, book) => sum + book.available, 0)} icon={<FaBook className="text-green-500" />} />
        <StatCard title="Borrowed Books" value="25" icon={<FaUserGraduate className="text-orange-500" />} />
      </div>
    </div>
  );
};

const BookTable = ({ books, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border-b text-left">Title</th>
          <th className="py-2 px-4 border-b text-left">Author</th>
          <th className="py-2 px-4 border-b text-left">Category</th>
          <th className="py-2 px-4 border-b text-left">Available</th>
          <th className="py-2 px-4 border-b text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id} className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">{book.title}</td>
            <td className="py-2 px-4 border-b">{book.author}</td>
            <td className="py-2 px-4 border-b">{book.category}</td>
            <td className="py-2 px-4 border-b">{book.available}</td>
            <td className="py-2 px-4 border-b">
              <div className="flex space-x-2">
                <button onClick={() => onEdit(book.id)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(book.id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
                <button className="text-green-500 hover:text-green-700">
                  <FaDownload />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    <div className="text-4xl">{icon}</div>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.node.isRequired,
};

BookTable.propTypes = {
  books: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ELibraryManagement;