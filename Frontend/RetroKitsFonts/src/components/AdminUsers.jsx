import React, { useState, useEffect, useContext } from "react";
import './../css/AdminDashboard.css'
import { TokenContext } from "../context/TokenContext";
import { CHANGE_ROLE, SHOW_USER_PROFILE } from "../config";
// Definir las URLs de las APIs


export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null); // Para editar un usuario
  const [selectedRole, setSelectedRole] = useState(""); // Estado para el rol seleccionado
  const { token } = useContext(TokenContext);

  // Cargar usuarios al iniciar
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(SHOW_USER_PROFILE, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          console.log(users)
        } else {
          console.error("Error al obtener los usuarios");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Manejar cambio de rol
  const handleChangeRole = async () => {
    if (!selectedRole) {
      alert("Por favor, selecciona un rol.");
      return;
    }

    const changes = { Rol: selectedRole };

    try {
      const response = await fetch(`${CHANGE_ROLE}${editUser.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changes),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => user.id === editUser.id ? updatedUser : user));
        alert("Rol de usuario actualizado exitosamente.");
        setEditUser(null);
      } else {
        console.error("Error al cambiar el rol del usuario");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  return (
    <div className="admin-users">
      <h2>Gestión de Usuarios</h2>

      {/* Mostrar formulario de edición si hay un usuario seleccionado */}
      {editUser && (
        <div className="edit-user-form">
          <h3>Editar Usuario</h3>
          <input
            type="text"
            disabled
            placeholder="Nombre"
            value={editUser.name}
          />
          <input
            type="email"
            placeholder="Email"
            disabled
            value={editUser.email}
          />
          <input
            type="text"
            disabled
            placeholder="Dirección"
            value={editUser.address}
          />
          <input
            type="password"
            disabled
            placeholder="Contraseña"
            value={editUser.password}
          />
          <input
            type="date"
            disabled
            placeholder="Fecha de Nacimiento"
            value={editUser.birthday}
          />

          {/* Selector de rol */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="Admin">Administrador</option>
            <option value="User">Usuario</option>
          </select>

          <button onClick={handleChangeRole}>Actualizar rol</button>
          <button onClick={() => setEditUser(null)}>Cancelar</button>
        </div>
      )}

      {/* Listado de usuarios */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => { 
                  setEditUser(user);
                  setSelectedRole(user.role);
                }}>Editar</button>
                <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
