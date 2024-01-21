import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import AuthForm from "@/components/AuthForm";

const Page = async () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-grow">
        <div className="container px-6 py-16 mx-auto text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-800">
            College Admissions Simplified
          </h1>
          <h2 className="mb-8 text-2xl text-gray-600">
            Built by students, for students.
          </h2>
          <p className="mb-8 text-gray-600">
            Aviquo offers personalized tips and access to extracurriculars to
            help high schoolers succeed in the college admissions process.
          </p>
          <a
            href="/auth/"
            className="px-6 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Get Started
          </a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <h3 className="text-4xl font-bold text-gray-800">
              Why Choose Aviquo?
            </h3>
            <p className="mt-4 text-gray-600">
              We provide unique insights and opportunities tailored for high
              schoolers aspiring to get into their dream colleges.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <i className="mb-4 text-6xl text-indigo-600 fas fa-user-graduate"></i>
              <h4 className="mb-2 text-xl font-bold text-gray-800">
                Student-Centric
              </h4>
              <p className="text-gray-600">
                Designed with a deep understanding of student needs and
                aspirations.
              </p>
            </div>
            <div className="text-center">
              <i className="mb-4 text-6xl text-indigo-600 fas fa-lightbulb"></i>
              <h4 className="mb-2 text-xl font-bold text-gray-800">
                Actionable Tips
              </h4>
              <p className="text-gray-600">
                Practical advice that can be implemented immediately for better
                results.
              </p>
            </div>
            <div className="text-center">
              <i className="mb-4 text-6xl text-indigo-600 fas fa-handshake"></i>
              <h4 className="mb-2 text-xl font-bold text-gray-800">
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

      <section className="py-16 text-white bg-indigo-600">
        <div className="container px-6 mx-auto text-center">
          <h3 className="mb-4 text-3xl font-bold">
            Ready to take the next step?
          </h3>
          <p className="mb-8">
            Sign up now and start exploring the resources that will propel you
            towards your college goals.
          </p>
          <a
            href="/auth/"
            className="px-6 py-3 font-bold text-indigo-600 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Sign Up
          </a>
        </div>
      </section>

      <footer className="py-6 bg-white">
        <div className="container px-6 mx-auto text-center">
          <p className="text-gray-600">
            &copy; 2023 Aviquo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
