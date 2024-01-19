import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import AuthForm from "@/components/AuthForm";

const Page = async () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-grow">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            College Admissions Simplified
          </h1>
          <h2 className="text-2xl text-gray-600 mb-8">
            Built by students, for students.
          </h2>
          <p className="text-gray-600 mb-8">
            Aviquo offers personalized tips and access to extracurriculars to
            help high schoolers succeed in the college admissions process.
          </p>
          <a
            href="/discover"
            className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Get Started
          </a>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800">
              Why Choose Aviquo?
            </h3>
            <p className="text-gray-600 mt-4">
              We provide unique insights and opportunities tailored for high
              schoolers aspiring to get into their dream colleges.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <i className="fas fa-user-graduate text-indigo-600 text-6xl mb-4"></i>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Student-Centric
              </h4>
              <p className="text-gray-600">
                Designed with a deep understanding of student needs and
                aspirations.
              </p>
            </div>
            <div className="text-center">
              <i className="fas fa-lightbulb text-indigo-600 text-6xl mb-4"></i>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Actionable Tips
              </h4>
              <p className="text-gray-600">
                Practical advice that can be implemented immediately for better
                results.
              </p>
            </div>
            <div className="text-center">
              <i className="fas fa-handshake text-indigo-600 text-6xl mb-4"></i>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Community Support
              </h4>
              <p className="text-gray-600">
                Join a community of peers and mentors to guide you through the
                process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to take the next step?
          </h3>
          <p className="mb-8">
            Sign up now and start exploring the resources that will propel you
            towards your college goals.
          </p>
          <a
            href="/auth/"
            className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Sign Up
          </a>
        </div>
      </section>

      <footer className="bg-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">
            &copy; 2023 Aviquo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
