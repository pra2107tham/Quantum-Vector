"use client";

import Image from "next/image";
import Header from "@/web/components/Header";
import Footer from "@/web/components/Footer";
import { imgImage10 } from "@/web/assets";
import { motion } from "motion/react";

export default function ShippingAndDelivery() {
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
            Shipping and Delivery
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
              <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-6">
                Since we&apos;re dealing with digital products (webinars and courses),
                there&apos;s no physical shipping involved. Here&apos;s how you&apos;ll
                receive your purchased content:
              </p>

              <div className="space-y-6">
                <section>
                  <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-3">Digital Delivery</h2>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-2">
                    Upon successful purchase, you&apos;ll receive:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Immediate access to your purchased content through your account</li>
                    <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">A confirmation email with access instructions</li>
                    <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Any additional materials or resources included with your purchase</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-3">Access Timeframe</h2>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-2">
                    For webinars:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Live webinars: Access details will be sent 24 hours before the scheduled time</li>
                    <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Recorded webinars: Immediate access after purchase</li>
                  </ul>

                  <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-2">
                    For courses:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Full access to all course materials immediately after purchase</li>
                    <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Access duration as specified in the course details</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-3">Technical Requirements</h2>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                    To ensure smooth access to your purchased content, please make sure you have:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">A stable internet connection</li>
                    <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">An up-to-date web browser</li>
                    <li className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px]">Required software or plugins (if specified in the course details)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-outfit font-semibold text-black text-[20px] md:text-[24px] mb-3">Customer Support</h2>
                  <p className="font-sans font-normal text-[#2d2d2d] text-[14px] md:text-[16px] mb-4">
                    If you experience any issues accessing your purchased content, please contact our support team at <a href="mailto:frontdesk@thedevopscommunity.com" className="text-[#1447e6] hover:underline">frontdesk@thedevopscommunity.com</a>. We&apos;re here to help ensure you have a smooth learning experience.
                  </p>
                </section>
              </div>
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
