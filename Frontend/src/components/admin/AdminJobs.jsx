import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";  // Assuming these components are available in your project
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';

const AdminJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const job = {
      ...newJob,
      id: uuidv4(),
      postedAt: new Date(),
    };

    setJobs((prev) => [job, ...prev]); // Add new job to the list
    setNewJob({
      title: '',
      company: '',
      location: '',
      description: '',
    });
    setIsDialogOpen(false);  // Close the dialog after submission
  };

  return (
    <>
    <Navbar />
    <div className="p-4 mx-auto bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-primary-foreground">
      <h1 className="mb-4 text-2xl font-bold">Admin Job Board</h1>
      
      {/* Dialog for adding a new job */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Post a New Job</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post a New Job</DialogTitle>
            <DialogDescription>Fill out the form below to post a new job listing.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={newJob.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={newJob.company}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={newJob.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newJob.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Post Job</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <h2 className="mb-4 text-xl font-semibold">Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.company} - {job.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{job.description}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Posted on: {job.postedAt.toLocaleDateString()}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  <Footer />
    </>
  );
};

export default AdminJobsPage;
