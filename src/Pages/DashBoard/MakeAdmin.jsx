import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MakeAdmin = () => {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Fetch users with search
  const {
    data: users = [],
    isLoading,
  } = useQuery({
    queryKey: ['users', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
    enabled: search.length >= 1,
  });

  // Update user role
  const mutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users', search]);
    },
  });

  const handleRoleChange = (user, role) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${role === 'admin' ? 'make' : 'remove'} ${
        user.email
      } as admin?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(
          { id: user._id, role },
          {
            onSuccess: () =>
              Swal.fire('Updated!', 'User role updated.', 'success'),
            onError: () => Swal.fire('Error', 'Something went wrong.', 'error'),
          }
        );
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Role Manager</h2>

      <input
        type="text"
        placeholder="Search user by email..."
        className="input input-bordered w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === 'admin'
                          ? 'badge-success'
                          : 'badge-outline'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.created_at
                      ? new Date(user.created_at).toLocaleString()
                      : 'N/A'}
                  </td>
                  <td>
                    {user.role === 'admin' ? (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleRoleChange(user, 'user')}
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleRoleChange(user, 'admin')}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
