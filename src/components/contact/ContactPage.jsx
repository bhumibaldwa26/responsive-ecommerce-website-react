import { IoCallOutline, IoMailOutline, IoLocationOutline } from "react-icons/io5";
import { toast } from "sonner";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for your message! We will get back to you shortly.");
    e.target.reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Page header */}
      <div className="border-b border-slate-100 pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact Us
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Have an inquiry? Send us a message or get in touch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Contact Information Cards (1 col) */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
            
            {/* Phone Info */}
            <div className="flex gap-4 items-start pb-6 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                <IoCallOutline className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-slate-800">Call To Us</h4>
                <p className="text-xs text-slate-500">We are available 24/7, 7 days a week.</p>
                <p className="text-xs font-bold text-slate-700">Phone: +123 456 7890</p>
              </div>
            </div>

            {/* Email Info */}
            <div className="flex gap-4 items-start pb-6 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                <IoMailOutline className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-slate-800">Write To Us</h4>
                <p className="text-xs text-slate-500">Fill out our form and we will contact you within 24 hours.</p>
                <p className="text-xs font-bold text-slate-700">Email: customer@exclusive.com</p>
                <p className="text-xs font-bold text-slate-700">Email: support@exclusive.com</p>
              </div>
            </div>

            {/* Address Info */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                <IoLocationOutline className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-slate-800">Address</h4>
                <p className="text-xs text-slate-500">Come visit our primary branch location.</p>
                <p className="text-xs font-bold text-slate-700 leading-normal">
                  123 Main St, Suite 400, <br />
                  Metropolis, NY 10001
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Message Submission Form (2 cols) */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-extrabold text-slate-800">Send Us A Message</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Your Name"
                  className="w-full bg-slate-50 border border-slate-200 text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 focus:bg-white text-slate-800"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Your Email"
                  className="w-full bg-slate-50 border border-slate-200 text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 focus:bg-white text-slate-800"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                required
                rows="5"
                placeholder="How can we help you today?"
                className="w-full bg-slate-50 border border-slate-200 text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 focus:bg-white text-slate-800"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold text-sm rounded-lg shadow-sm shadow-red-100 hover:shadow-md transition-all duration-200"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
