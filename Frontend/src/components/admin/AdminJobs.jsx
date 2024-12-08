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
        <div className='flex flex-row justify-between mx-auto'>
          <h1 className="mb-4 text-2xl font-bold">Admin Job Board</h1>

          {/* Dialog for adding a new job */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mb-4">Post a new Job</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{newJob.title}</DialogTitle>
                <DialogDescription>
                  Edit the details for this job listing.
                </DialogDescription>
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
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={newJob.company.companyName}
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
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    name="salary"
                    value={newJob.salary}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Input
                    id="jobType"
                    name="jobType"
                    value={newJob.jobType}
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
                {/* <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={newJob.requirements.join("\n")}
                    onChange={(e) =>
                      setFormData({
                        ...newJob,
                        requirements: e.target.value.split("\n"),
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    id="benefits"
                    name="benefits"
                    value={newJob.benefits.join("\n")}
                    onChange={(e) =>
                      setFormData({
                        ...newJob,
                        benefits: e.target.value.split("\n"),
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Responsibilities</Label>
                  <Textarea
                    id="responsibilities"
                    name="responsibilities"
                    value={newJob.responsibilities.join("\n")}
                    onChange={(e) =>
                      setFormData({
                        ...newJob,
                        responsibilities: e.target.value.split("\n"),
                      })
                    }
                    required
                  />
                </div> */}
                <DialogFooter>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader >
            <CardTitle>Posted Jobs</CardTitle>
            <CardDescription>A list of all jobs posted in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <p>No jobs posted yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Posted On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.description}</TableCell>
                      <TableCell>{new Date(job.postedAt).toLocaleDateString()}</TableCell>
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
};

export default AdminJobsPage;
