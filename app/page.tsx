'use client'

import Image from 'next/image';
import { mainCharacter } from '@/images';
import IceCube from '@/icons/Angle';
import Link from 'next/link';



export default function Home() {  
  return (
    <div className="bg-[#1d2025] flex justify-center items-center h-screen">
      <div className="w-full max-w-xl text-white flex flex-col items-center">
        <div className="w-64 h-64 rounded-full circle-outer p-2 mb-8">
          <div className="w-full h-full rounded-full circle-inner overflow-hidden relative">
            <Image
              src={mainCharacter}
              alt="Main Character"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'scale(0.9) translateY(0%)'
              }}
            />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Welcome to Capy </h1>
        
        <p className="text-xl mb-2"><Link href="/clicker" className="underline button">Play</Link></p>
      </div>
    </div>
  );
}
