import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listAllUsers } from '../../services/userService'
import { deleteUser } from "../../services/userService";
import { toast } from "react-toastify";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Button,
} from "@/components/ui/button";
import {
  Input,
} from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash } from "lucide-react";
import { FaEye } from "react-icons/fa";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState([]);
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { users: fetchedUsers, nextCursor } = await listAllUsers();
        setUsers(fetchedUsers);
        setNextCursor(nextCursor);
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || (roleFilter === 'admin' ? user.isAdmin : !user.isAdmin);
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(user => user._id !== userId));
      toast.success("User deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const toggleSelectUser = (userId) => {
    setSelectedUser((prev) =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedUser.map((userId) => deleteUser(userId)));
      setUsers(prev => prev.filter((user) => !selectedUser.includes(user._id)));
      setSelectedUser([]);
      toast.success("Selected users deleted");
    } catch {
      toast.error("Failed to delete selected users");
    }
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const { users: moreUsers, nextCursor: newNextCursor } = await getAllUsers(nextCursor);
      setUsers(prev => [...prev, ...moreUsers]);
      setNextCursor(newNextCursor);
      if(!newNextCursor) {
        toast.info("No more users to load");
      }
    } catch {
      toast.error("Failed to load more");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Input
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sm:w-1/3"
            />
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
                <SelectItem value="user">Users</SelectItem>
              </SelectContent>
            </Select>
            {selectedUser.length > 0 && (
              <Button variant="destructive" onClick={handleDeleteSelected} className="sm:w-auto w-full">
                Delete Selected ({selectedUser.length})
              </Button>
            )}
          </div>

          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded" />
              ))}
            </div>
          ) : (
            <div className=" ">
              <Table className="w-full overflow-x-scroll">
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUser.includes(user._id)}
                          onCheckedChange={() => toggleSelectUser(user._id)}
                        />
                      </TableCell>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/superadmin-dashboard/users/:id`)}
                          className="hover:bg-gray-200"
                        >
                          <FaEye/>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-gray-200"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                         <Trash color="red" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {nextCursor && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserList;
