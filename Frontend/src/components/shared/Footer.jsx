import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Linkedin, Instagram, Send } from 'lucide-react'

function Footer() {
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Add newsletter signup logic here
        console.log("Newsletter signup submitted");
      };
      

  return (
    <footer className="bg-[#121212] text-primary-foreground">
      <div className="container px-6 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">NextStep</h2>
            <p className="text-sm">Connecting talents with opportunities. Your next career move starts here.</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Find Jobs</a></li>
              <li><a href="#" className="hover:underline">Post a Job</a></li>
              <li><a href="#" className="hover:underline">Resume Database</a></li>
              <li><a href="#" className="hover:underline">Career Advice</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-foreground text-primary"
                required
              />
              <Button type="submit" variant="secondary" className="w-full">
                Subscribe
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
        <Separator className="my-8 bg-primary-foreground/20" />
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="text-sm">&copy; 2024 NextStep. All rights reserved.</p>
          <div className="flex mt-4 space-x-4 md:mt-0">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;