import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleUser } from '@/services/userService';
import { toast } from 'react-toastify';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const ViewUserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const viewUser = async () => {
      try {
        const user = await fetchSingleUser("" + id);
        setUserDetails(user);
      } catch (error) {
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };
    viewUser();
  }, [id]);

  const handleDelete = () => {
    toast.success("User deleted (simulate logic here)");
    // Add your delete user API call here
    navigate('/admin-dashboard/users');
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 max-w-3xl mx-auto mt-10">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Alert variant="destructive">
          <AlertTitle>User Not Found</AlertTitle>
          <AlertDescription>The requested user profile could not be loaded.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Profile Card */}
      <Card className="flex flex-col md:flex-row items-center gap-6 p-6">
        <img
          src={userDetails.profilePicture || '/placeholder.png'}
          alt="Profile"
          className="h-28 w-28 rounded-full object-cover border"
        />
        <div className="flex-1 space-y-1">
          <CardTitle className="text-2xl">{userDetails.fullName}</CardTitle>
          <CardDescription>{userDetails.email}</CardDescription>
          <p className="text-sm text-muted-foreground">
            Role: <span className="font-medium">{userDetails.isAdmin ? "Admin" : "User"}</span>
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
            <Button onClick={() => navigate(`/admin-dashboard/users/${id}/edit`)}>Edit Profile</Button>

            {/* Delete Confirmation */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete User</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will permanently delete the user and all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </Card>

      {/* Details Section */}
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><strong>Phone:</strong> {userDetails.phone || "N/A"}</div>
          <div><strong>Address:</strong> {userDetails.address || "N/A"}</div>
          <div><strong>Joined:</strong> {new Date(userDetails.createdAt).toLocaleDateString()}</div>
          <div><strong>Last Updated:</strong> {new Date(userDetails.updatedAt).toLocaleDateString()}</div>
          <div><strong>Orders:</strong> {userDetails.orders?.length || 0}</div>
          <div><strong>Wishlist:</strong> {userDetails.wishlist?.length || 0}</div>
          <div><strong>Cart:</strong> {userDetails.cart?.length || 0}</div>
          <div><strong>Reviews:</strong> {userDetails.reviews?.length || 0}</div>
          <div><strong>Rating:</strong> {userDetails.rating ?? "N/A"}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewUserProfile;
