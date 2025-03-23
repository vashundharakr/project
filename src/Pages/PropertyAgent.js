// import { motion } from "framer-motion";
import call from '../assets/img/call-to-action.jpg';

const PropertyAgent = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="bg-gray-100 rounded-xl p-5">
        <div className="bg-white rounded-xl p-6 border border-dashed border-green-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <img
              className="rounded-lg w-full"
              src={call}
              alt="Call to Action"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            />
            <div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-3">Contact With Our Certified Agent</h1>
                <p className="text-gray-600">
                  Eirmod sed ipsum dolor sit rebum magna erat. Tempor lorem kasd vero ipsum sit sit diam justo sed vero dolor duo.
                </p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-600 text-white py-3 px-5 rounded-lg flex items-center shadow-md hover:bg-blue-700 transition">
                  <i className="fa fa-phone-alt mr-2"></i> Make A Call
                </a>
                <a href="#" className="bg-gray-900 text-white py-3 px-5 rounded-lg flex items-center shadow-md hover:bg-gray-800 transition">
                  <i className="fa fa-calendar-alt mr-2"></i> Get Appointment
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAgent;