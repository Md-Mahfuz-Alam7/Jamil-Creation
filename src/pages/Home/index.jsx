import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#EEF2FF] to-white">
        <div className="container mx-auto px-4 lg:px-6 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Create Professional Invoices in Minutes
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Generate, customize, and send professional invoices instantly. Perfect for freelancers, small businesses, and enterprises.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/create-invoice">
                  <Button 
                    variant="primary" 
                    size="large"
                    className="px-8 py-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white"
                  >
                    Get Started - It's Free
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant="secondary" 
                    size="large"
                    className="px-8 py-4 border-2 border-[#4F46E5] text-[#4F46E5] hover:bg-[#EEF2FF]"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">2,157+</span> businesses already using JC Invoice
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/images/invoice-dashboard.png" 
                  alt="Invoice Dashboard" 
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 -left-4 -bottom-4 bg-[#4F46E5] rounded-lg transform rotate-2 z-0"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage invoices
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you create, manage, and track invoices with ease
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📝",
                title: "Easy Invoice Creation",
                description: "Create professional invoices in minutes with our intuitive interface and templates"
              },
              {
                icon: "🔄",
                title: "Automated Reminders",
                description: "Set up automatic payment reminders to get paid faster"
              },
              {
                icon: "📊",
                title: "Financial Reports",
                description: "Generate detailed reports to track your business performance"
              },
              {
                icon: "🌐",
                title: "Multi-Currency Support",
                description: "Create invoices in any currency and get paid in your preferred currency"
              },
              {
                icon: "📱",
                title: "Mobile Friendly",
                description: "Access your invoices and manage payments from any device"
              },
              {
                icon: "🔒",
                title: "Secure & Reliable",
                description: "Your data is encrypted and securely stored in the cloud"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-[#F9FAFB]">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No hidden fees. No surprises. Start free and upgrade when you need to.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "0",
                features: [
                  "5 invoices per month",
                  "Basic templates",
                  "Email support",
                  "Export as PDF"
                ]
              },
              {
                name: "Pro",
                price: "15",
                popular: true,
                features: [
                  "Unlimited invoices",
                  "Custom templates",
                  "Priority support",
                  "Advanced reporting",
                  "Team collaboration"
                ]
              },
              {
                name: "Enterprise",
                price: "49",
                features: [
                  "All Pro features",
                  "Custom branding",
                  "API access",
                  "Dedicated support",
                  "Custom integration"
                ]
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-xl ${
                  plan.popular 
                    ? 'bg-[#4F46E5] text-white ring-4 ring-[#4F46E5] ring-opacity-50' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-sm">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className={`w-5 h-5 mr-2 ${plan.popular ? 'text-white' : 'text-[#4F46E5]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "secondary" : "primary"}
                  className={`w-full py-3 ${
                    plan.popular 
                      ? 'bg-white text-[#4F46E5] hover:bg-gray-50' 
                      : 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
                  }`}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to streamline your invoicing?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of businesses who trust JC Invoice for their invoicing needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/create-invoice">
                <Button 
                  variant="primary" 
                  size="large"
                  className="px-8 py-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white"
                >
                  Get Started For Free
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="secondary" 
                  size="large"
                  className="px-8 py-4 border-2 border-[#4F46E5] text-[#4F46E5] hover:bg-[#EEF2FF]"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
