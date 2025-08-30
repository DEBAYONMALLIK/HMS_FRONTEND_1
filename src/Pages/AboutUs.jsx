import pic from "../assets/hms_building.png"; // replace with hospital/healthcare related image
import Homelayout from "../Layouts/HomeLayouts";

function AboutUs() {
  return (
    <Homelayout>
      <div className="px-12 pt-16 text-white">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <section className="md:w-1/2 space-y-6">
            <h1 className="text-5xl text-blue-400 font-bold">
              About <span className="text-white">Our System</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our Hospital Management System is designed to simplify and 
              streamline healthcare operations. From managing patient records 
              and appointments to enabling smooth communication between doctors, 
              patients, and staff — we ensure better care and efficiency. 
              <br /><br />
              Built with modern technology, our platform empowers healthcare 
              providers to focus on what matters most: <span className="text-blue-300 font-semibold">patient health</span>.
            </p>
          </section>

          <img
            className="w-full md:w-2/5 h-[300px] md:h-[400px] object-contain"
            src={pic}
            alt="Hospital Management Illustration"
          />
        </div>

        {/* Mission / Values Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-gray-900 shadow-lg hover:scale-105 transition">
            <h3 className="text-2xl font-semibold text-blue-300 mb-3">Our Mission</h3>
            <p className="text-gray-300">
              To improve patient care and hospital efficiency with a 
              digital-first, secure, and user-friendly management system.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900 shadow-lg hover:scale-105 transition">
            <h3 className="text-2xl font-semibold text-blue-300 mb-3">Our Vision</h3>
            <p className="text-gray-300">
              To create a connected healthcare ecosystem where technology 
              bridges the gap between patients and providers.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900 shadow-lg hover:scale-105 transition">
            <h3 className="text-2xl font-semibold text-blue-300 mb-3">Our Values</h3>
            <p className="text-gray-300">
              Compassion, transparency, and innovation guide us in 
              building solutions that truly matter in healthcare.
            </p>
          </div>
        </div>

  
      </div>
    </Homelayout>
  );
}

export default AboutUs;
