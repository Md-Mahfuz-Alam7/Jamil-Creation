import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { AiFillAndroid, AiFillApple } from "react-icons/ai";
import { FaFileInvoice, FaDatabase, FaFileDownload } from "react-icons/fa";
import Footer from '../../components/common/Footer';

const Home = () => {

  const cards = [
    {
      icon: FaFileInvoice,
      title: "Easy Invoice Creation",
      description: "Easily generate & manage invoices for your purchases"
    },
    {
      icon: FaDatabase,
      title: "Data Storage",
      description: "Securely store your invoice data & get use them"
    },
    {
      icon: FaFileDownload,
      title: "One Click Download",
      description: "Download all your invoice data in one click in an Excel sheet"
    },
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* bg-gradient-to-b from-[#EEF2FF] to-white */}
      <div className="relative bg-white">
        <div className="container mx-auto px-4 lg:px-6 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 center">
                Discover The Essence Of Tradition
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                A custom web app for Jamil Creation. With Creating invoice and download the chat app.
              </p>
              <p className="text-1xl lg:text-2xl font-bold text-gray-900 leading-tight mb-6">
                Download The App From Here
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/download">
                  <Button
                    variant="secondary"
                    size="large"
                    icon={AiFillApple}
                    className="px-8 py-4 bg-[#d4a373] text-white hover:bg-[#ce9155]"
                  >
                    For IOS
                  </Button>
                </Link>
                <Link to="/download">
                  <Button
                    variant="primary"
                    size="large"
                    icon={AiFillAndroid}
                    className="px-8 py-4 bg-[#d4a373] hover:bg-[#ce9155] text-white"
                  >
                    For Android
                  </Button>
                </Link>
              </div>

            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/images/top-1.png"
                  alt="Invoice Dashboard"
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 -left-4 -bottom-4 bg-[#d4a373] rounded-lg transform rotate-2 z-0"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Here are the features you can use
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you create, manage, and track invoices with ease. And stay tuned with our upcoming mobile app!
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">
                  {React.createElement(feature.icon, { className: "w-12 h-12 text-[#d4a373]" })}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Mobile App Preview Section */}
          <div className="mt-16 flex flex-col-reverse lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <img
                src="/images/undraw_text-messages_978a.svg"
                alt="Mobile App Preview"
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Mobile App Coming Soon!
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Our mobile app will revolutionize how you communicate with your staff. 
                Stay connected, share updates, and manage your business on the go.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="secondary"
                  size="large"
                  icon={AiFillApple}
                  className="px-8 py-4 bg-gray-900 text-white hover:bg-gray-800"
                >
                  Coming to iOS
                </Button>
                <Button
                  variant="secondary"
                  size="large"
                  icon={AiFillAndroid}
                  className="px-8 py-4 bg-[#d4a373] text-white hover:bg-[#ce9155]"
                >
                  Coming to Android
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* footer */}

      <Footer/>


    </div>
  );
};

export default Home;
