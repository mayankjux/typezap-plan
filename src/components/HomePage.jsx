import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

const plans = [
  {
    name: 'Hobby',
    price: '$0',
    period: 'Free forever',
    description: 'Perfect for side projects and learning',
    features: [
      '1,000 API calls/month',
      'Basic analytics',
      'Community support',
      '1 project',
    ],
    buttonText: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'Everything you need for professional development',
    features: [
      '50,000 API calls/month',
      'Advanced analytics',
      'Priority support',
      'Unlimited projects',
      'Custom integrations',
      'Team collaboration',
    ],
    buttonText: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'per month',
    description: 'Advanced features for larger teams',
    features: [
      'Unlimited API calls',
      'Enterprise analytics',
      'Dedicated support',
      'Custom solutions',
      'SLA guarantee',
      'Advanced security',
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-light-dark">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
          Choose Your Perfect Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get started with our flexible pricing options. Scale as you grow.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl ${
                plan.highlighted
                  ? 'bg-primary text-white shadow-custom-lg scale-105 z-10'
                  : 'bg-white text-dark shadow-custom'
              } p-8 transition-all duration-300 hover:shadow-custom-lg`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="ml-2 text-sm opacity-80">{plan.period}</span>
                  </div>
                  <p className={`text-sm ${plan.highlighted ? 'text-primary-light' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckIcon className={`h-5 w-5 ${plan.highlighted ? 'text-primary-light' : 'text-secondary'} mr-3 flex-shrink-0`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-white text-primary hover:bg-gray-100'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools and features you need to build amazing applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Lightning Fast',
                description: 'Built for speed and performance',
                icon: '⚡',
              },
              {
                title: 'Secure by Default',
                description: 'Enterprise-grade security built-in',
                icon: '🔒',
              },
              {
                title: '24/7 Support',
                description: `We're here to help you succeed`,
                icon: '🎯',
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 