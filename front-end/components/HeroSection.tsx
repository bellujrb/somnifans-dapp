'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play, TrendingUp, Users, Zap, Globe, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-brand-50"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-brand-500/10 to-brand-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-brand-400/8 to-brand-500/4 rounded-full blur-3xl"></div>
        
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e9316b' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-black leading-tight text-gray-900">
                <div className="mb-2">The Future of Fan Engagement</div>
                <div className="text-brand-500 mb-2">with Blockchain and Twitter</div>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Somnifans turns real fan sentiment into prediction tokens using 
              the power of Twitter and Somnia.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/trading">
                <Button
                  size="lg"
                  className="group bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Launch App
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative w-full h-[600px] lg:h-[700px]">
              {/* Main Image */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative">
                  <Image
                    src="/girl.png"
                    alt="Female Athlete"
                    width={500}
                    height={650}
                    className="mx-auto max-h-[70vh] max-w-[90%] object-contain object-top"
                    priority
                  />
                  
                  {/* Subtle Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-500/5 via-transparent to-transparent rounded-full blur-3xl -z-10 scale-125"></div>
                </div>
              </div>

              {/* Floating Cards - Twitter Sentiment & Token Cards */}
              <div className="absolute top-20 right-8 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 animate-float z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">$HYPE</span>
                  </div>
                  <div>
                    <div className="text-gray-900 font-bold">1000</div>
                    <div className="text-green-500 text-sm font-semibold">Tokens Earned</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-32 left-8 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 animate-float z-20" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">💎</span>
                  </div>
                  <div>
                    <div className="text-gray-900 font-bold text-sm">$STT Staking</div>
                    <div className="text-gray-500 text-xs">Shannon Token</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-40 left-12 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 animate-float z-20" style={{animationDelay: '2s'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">🎯</span>
                  </div>
                  <div>
                    <div className="text-gray-900 font-bold text-sm">Fan Prediction</div>
                    <div className="text-gray-500 text-xs">Based on Hype 🔥</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 right-16 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 animate-float z-20" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">🐦</span>
                  </div>
                  <div>
                    <div className="text-gray-900 font-bold text-sm">Twitter Hype</div>
                    <div className="text-gray-500 text-xs">Fan Sentiment</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-32 right-32 w-4 h-4 bg-brand-500 rounded-full opacity-20 animate-pulse z-20"></div>
              <div className="absolute bottom-40 left-32 w-3 h-3 bg-brand-400 rounded-full opacity-30 animate-pulse z-20" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 right-20 w-2 h-2 bg-brand-300 rounded-full opacity-40 animate-pulse z-20" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}