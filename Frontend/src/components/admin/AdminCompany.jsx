import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

export default function AdminCompany() {
    const [companies, setCompanies] = useState([]);
    const [newCompany, setNewCompany] = useState({
        name: '',
        industry: '',
        employeeCount: 0,
        foundedYear: new Date().getFullYear(),
        website: '',
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCompany(prev => ({
            ...prev,
            [name]: name === 'employeeCount' || name === 'foundedYear' ? parseInt(value, 10) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const company = {
            ...newCompany,
            id: uuidv4(),
        };
        setCompanies(prev => [...prev, company]);
        setNewCompany({
            name: '',
            industry: '',
            employeeCount: 0,
            foundedYear: new Date().getFullYear(),
            website: '',
        });
        setIsDialogOpen(false);
    };

    return (
        <>
        <Navbar/>
        
        
        <div className="p-4 mx-auto bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-primary-foreground">
            
            <h1 className="mb-4 text-2xl font-bold">Company Management</h1>

            <div className="mb-4">
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
                                <Label htmlFor="name">Company Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={newCompany.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="industry">Industry</Label>
                                <Input
                                    id="industry"
                                    name="industry"
                                    value={newCompany.industry}
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
                                <Label htmlFor="foundedYear">Founded Year</Label>
                                <Input
                                    id="foundedYear"
                                    name="foundedYear"
                                    type="number"
                                    value={newCompany.foundedYear}
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
                                    <TableHead>Industry</TableHead>
                                    <TableHead>Employees</TableHead>
                                    <TableHead>Founded</TableHead>
                                    <TableHead>Website</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {companies.map(company => (
                                    <TableRow key={company.id}>
                                        <TableCell>{company.name}</TableCell>
                                        <TableCell>{company.industry}</TableCell>
                                        <TableCell>{company.employeeCount}</TableCell>
                                        <TableCell>{company.foundedYear}</TableCell>
                                        <TableCell>
                                            <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                {company.website}
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
                    <Footer/>
        </>
    );
}
