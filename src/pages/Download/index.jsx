import React from 'react';
import { FaApple, FaAndroid, FaMobileAlt, FaDownload, FaLock, FaComments } from 'react-icons/fa';
import Button from '../../components/ui/Button';

const DownloadPage = () => {
  const features = [
    {
      icon: FaComments,
      title: "Instant Messaging",
      description: "Stay connected with your team through fast and reliable messaging"
    },
    {
      icon: FaLock,
      title: "Secure Communication",
      description: "End-to-end encryption ensures your conversations remain private"
    },
    {
      icon: FaMobileAlt,
      title: "Cross-Platform",
      description: "Available on both iOS and Android devices"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Download Our Mobile App
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Experience seamless communication and invoice management on the go. Download our app now!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  icon={FaApple}
                  variant="secondary"
                  className="px-8 py-4 bg-gray-900 text-white hover:bg-gray-800"
                >
                  Download for iOS
                </Button>
                <Button
                  icon={FaAndroid}
                  variant="secondary"
                  className="px-8 py-4 bg-[#3DDC84] text-white hover:bg-[#32B66D]"
                >
                  Download for Android
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="/images/undraw_text-messages_978a.svg"
                alt="Mobile App Preview"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            App Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <feature.icon className="w-12 h-12 text-[#d4a373] mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download CTA Section */}
      <div className="bg-[#d4a373] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Download our app now and experience the future of business communication.
          </p>
          <Button
            icon={FaDownload}
            variant="download"
            className="px-8 py-4 bg-white text-[#d4a373] hover:bg-gray-900 hover:text-white"
          >
            Download Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
