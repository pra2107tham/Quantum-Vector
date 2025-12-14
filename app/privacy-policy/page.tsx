"use client";

import Image from "next/image";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";
import { motion } from "motion/react";

export default function PrivacyPolicy() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <Image
          src={imgImage10}
          alt="DevOps Community Background"
          fill
          className="object-cover object-center pointer-events-none"
          priority
          unoptimized
        />
      </div>
      {/* Fallback background color */}
      <div className="fixed inset-0 -z-20 bg-[#dee2e9]" />

      {/* Hero Section */}
      <div className="glass-card-main relative min-h-[500px] md:min-h-[600px] mx-auto my-[23px] rounded-[32px] w-[calc(100%-50px)] max-w-[1383.548px] flex flex-col">
        <Header />
        <div className="flex flex-col gap-[20px] items-center justify-center flex-1 px-4 md:px-[59px] pb-[40px] md:pb-[60px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-outfit font-semibold text-black text-[32px] md:text-[48px] lg:text-[64px] text-center leading-tight"
          >
            Privacy Policy
          </motion.h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative w-full mt-[40px] md:mt-[60px] mb-[40px] md:mb-[60px]">
        <div className="relative flex flex-col items-center justify-center px-4 max-w-[1447.97px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card glass-card-blur-sm glass-card-opacity-light rounded-[20px] p-6 md:p-8 lg:p-12 w-full max-w-[1260px]"
          >
            <div className="prose prose-lg max-w-none">
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                Your privacy is important to us. It is DevOps Community&apos;s policy to respect
                your privacy regarding any information we may collect from you across
                our website, and other sites we own and operate.
              </p>
              <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-3 mt-6">Information We Collect</h2>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                We only ask for personal information when we truly need it to provide a
                service to you. We collect it by fair and lawful means, with your
                knowledge and consent. We also let you know why we&apos;re collecting it and
                how it will be used.
              </p>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                The types of personal information we may collect include:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Name</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Email address</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Payment information (for course and webinar purchases)</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Information you provide when you contact us for support</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Usage data related to your interaction with our courses and webinars</li>
              </ul>
              <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-3 mt-6">How We Use Your Information</h2>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Provide, operate, and maintain our website and services</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Improve, personalize, and expand our website and services</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Understand and analyze how you use our website and services</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Develop new products, services, features, and functionality</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Process your transactions for course and webinar enrollments</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Send you emails</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Find and prevent fraud</li>
              </ul>
              <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-3 mt-6">Log Files</h2>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                Our Company follows a standard procedure of using log files. These files
                log visitors when they visit websites. All hosting companies do this and
                a part of hosting services&apos; analytics. The information collected by
                log files include internet protocol (IP) addresses, browser type,
                Internet Service Provider (ISP), date and time stamp, referring/exit
                pages, and possibly the number of clicks. These are not linked to any
                information that is personally identifiable. The purpose of the
                information is for analyzing trends, administering the site, tracking
                users&apos; movement on the website, and gathering demographic information.
              </p>
              <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-3 mt-6">Cookies and Web Beacons</h2>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                Like any other website, Our Company uses &apos;cookies&apos;. These cookies are
                used to store information including visitors&apos; preferences, and the
                pages on the website that the visitor accessed or visited. The
                information is used to optimize the users&apos; experience by customizing
                our web page content based on visitors&apos; browser type and/or other
                information.
              </p>
              <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-3 mt-6">Third-Party Privacy Policies</h2>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                Our Company&apos;s Privacy Policy does not apply to other advertisers or
                websites. Thus, we are advising you to consult the respective Privacy
                Policies of these third-party ad servers for more detailed information.
                It may include their practices and instructions about how to opt-out of
                certain options.
              </p>
              <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-3 mt-6">Your Data Protection Rights</h2>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                We would like to make sure you are fully aware of all of your data
                protection rights. Every user is entitled to the following:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">The right to access – You have the right to request copies of your personal data.</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                If you make a request, we have one month to respond to you. If you would
                like to exercise any of these rights, please contact us.
              </p>
              <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-3 mt-6">Children&apos;s Information</h2>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                Another part of our priority is adding protection for children while
                using the internet. We encourage parents and guardians to observe,
                participate in, and/or monitor and guide their online activity.
              </p>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                Our Company does not knowingly collect any Personal Identifiable
                Information from children under the age of 13. If you think that your
                child provided this kind of information on our website, we strongly
                encourage you to contact us immediately and we will do our best efforts
                to promptly remove such information from our records.
              </p>
              <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-3 mt-6">Changes to This Privacy Policy</h2>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                We may update our Privacy Policy from time to time. Thus, we advise you
                to review this page periodically for any changes. We will notify you of
                any changes by posting the new Privacy Policy on this page. These
                changes are effective immediately, after they are posted on this page.
              </p>
              <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-3 mt-6">Contact Us</h2>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                If you have any questions or suggestions about our Privacy Policy, do
                not hesitate to contact us at <a href="mailto:frontdesk@thedevopscommunity.com" className="text-[#1447e6] hover:underline">frontdesk@thedevopscommunity.com</a>.
              </p>
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4"><em>Last updated: 29th May 2025</em></p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative w-full mt-[40px] md:mt-[60px]">
        <div className="relative flex flex-col items-center justify-center px-4 max-w-[1447.97px] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
