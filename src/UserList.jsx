import React, { useEffect, useState } from 'react';
import './UserList.css'; 

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = "https://664e3a0efafad45dfadf71b2.mockapi.io/users";
    const [newUserName, setNewUserName] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error al obtener usuarios:", error))
            .finally(() => {
                setLoading(false);
            });
    }, [apiUrl]);

    const handleCreateUser = () => {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newUserName }),
        })
            .then((response) => response.json())
            .then(() => {
                setNewUserName('');
                return fetch(apiUrl);
            })
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error(error.message));
    };

    const handleUpdateUser = () => {
        if (!selectedUser) return;

        fetch(`${apiUrl}/${selectedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newUserName }),
        })
            .then((response) => response.json())
            .then((updatedUser) => {
                setUsers(users.map((user) => (user.id === selectedUser.id ? updatedUser : user)));
                setNewUserName('');
                setSelectedUser(null);
            })
            .catch((error) => console.error('Error al actualizar usuario:', error));
    };

    const handleDeleteUser = (userId) => {
        fetch(`${apiUrl}/${userId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setUsers(users.filter((user) => user.id !== userId));
                setNewUserName('');
                setSelectedUser(null);
            })
            .catch((error) => console.error('Error al eliminar usuario:', error));
    };

    return (
        <div className="user-list-container">
            <h2>Lista de Usuarios</h2>
            <div className="form-container">
                <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Nombre del Usuario"
                />
                {selectedUser ? (
                    <button onClick={handleUpdateUser}>Actualizar Usuario</button>
                ) : (
                    <button onClick={handleCreateUser}>Crear Usuario</button>
                )}
            </div>
            {loading ? (
                <h1>Cargando...</h1>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <span className="user-name">{user.name}</span>
                            <div className="button-group">
                                <button onClick={() => setSelectedUser(user)}>Seleccionar para editar</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserList;
