import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Edit2 } from 'lucide-react';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { COMPANY_ENDPOINT_API } from "@/utility/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCompanies } from "@/redux/companySlice";
export default function AdminCompany() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.company);
  const [newCompany, setNewCompany] = useState({
    companyName: '',
    description: '',
    location: '',
    employeeCount: 0,
    website: '',
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prev) => ({
      ...prev,
      [name]: name === 'employeeCount' ? parseInt(value, 10) : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all required fields are present and valid
    if (!newCompany.companyName || !newCompany.description || !newCompany.location || !newCompany.employeeCount || !newCompany.website) {
      toast.error('Please fill in all required fields.');
      return;
    }
    const validEmployeeCount = !isNaN(newCompany.employeeCount) ? newCompany.employeeCount : 0;
    
    try {
      // Creating a new company object
      const formData = new FormData();
      formData.append('companyName', newCompany.companyName);
      formData.append('description', newCompany.description);
      formData.append('location', newCompany.location);
      formData.append('website', newCompany.website);
      formData.append('employeeCount', newCompany.employeeCount);


      // Making a POST request to the backend API to register the company
      const res = await axios.post(`${COMPANY_ENDPOINT_API}/register`, formData,
        {
          withCredentials: true,
        }
      );

      // Check if the response status is successful (e.g., 201 Created)
      if (res.data.success) {
        // Add the new company to the list if the response is successful
        dispatch(setCompanies((prev) => [...prev, res.data.newCompany]));

        // Reset the form inputs after submission
        setNewCompany({
          companyName: '',
          description: '',
          location: '',
          employeeCount: 0,
          website: '',
        });

        // Close the dialog
        setIsDialogOpen(false);


        // Show a success toast notification
        toast.success('Company added successfully.');
      } else {
        // If the response status isn't 201, show a failure toast notification
        toast.error('Failed to add company. Please try again.');
      }
    } catch (error) {
      // Handle errors that occur during the request
      console.error('Error occurred while adding the company:', error);

      // Show an error toast notification
      toast.error('An error occurred while adding the company.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 mx-auto bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-primary-foreground">
        <div className="container flex flex-row justify-between py-8 mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Company Management</h1>
          <div className="mb-4 ">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add New Company</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Company</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to add a new company to the system.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={newCompany.companyName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={newCompany.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newCompany.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">Number of Employees</Label>
                    <Input
                      id="employeeCount"
                      name="employeeCount"
                      type="number"
                      value={newCompany.employeeCount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={newCompany.website}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Company</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Registered Companies</CardTitle>
            <CardDescription>A list of all companies registered in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            {companies.length === 0 ? (
              <p>No companies registered yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map(company => (
                    <TableRow key={company.id}>
                      <TableCell>{company.companyName}</TableCell>
                      <TableCell>{company.employeeCount}</TableCell>
                      <TableCell>
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {company.website}
                        </a>
                      </TableCell>
                      <TableCell className="cursor-pointer ">

                        <div onClick={() => navigate(`/admin/companies/${company.id}`)} className='flex gap-2 cursor-pointer'>
                          <Edit2 className='w-4' />
                          <span>Edit</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
