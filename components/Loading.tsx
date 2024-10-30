'use client'

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { iceToken, mainCharacter,twitter,youtube,telegram,test } from '@/images';
import IceCube from '@/icons/IceCube';

import Link from 'next/link'
import { calculateEnergyLimit, calculateLevelIndex, calculatePointsPerClick, calculateProfitPerHour, GameState, InitialGameState, useGameStore } from '@/utils/game-mechanics';
import WebApp from '@twa-dev/sdk'; 

interface LoadingProps {
  setIsInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentView: (view: string) => void;
}

export default function Loading({ setIsInitialized, setCurrentView }: LoadingProps) {
  const initializeState = useGameStore((state: GameState) => state.initializeState);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const openTimestampRef = useRef(Date.now());

  const fetchOrCreateUser = useCallback(async () => {
    try {
      let initData, telegramId, username, telegramName, startParam;

      if (typeof window !== 'undefined') {
        const WebApp = (await import('@twa-dev/sdk')).default;
        WebApp.ready();
        initData = WebApp.initData;
        telegramId = WebApp.initDataUnsafe.user?.id.toString();
        username = WebApp.initDataUnsafe.user?.username || 'Unknown User';
        telegramName = WebApp.initDataUnsafe.user?.first_name || 'Unknown User';

        startParam = WebApp.initDataUnsafe.start_param;
      }


      const referrerTelegramId = startParam ? startParam.replace('kentId', '') : null;

      if (process.env.NEXT_PUBLIC_BYPASS_TELEGRAM_AUTH === 'true') {
        initData = "temp";
      }
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramInitData: initData,
          referrerTelegramId,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch or create user');
      }
      const userData = await response.json();

      console.log("user data: ", userData);

      // Check if initData and telegramName are defined
      if (!initData) {
        throw new Error('initData is undefined');
      }
      if (!telegramName) {
        throw new Error('telegramName is undefined');
      }

      // Create the game store with fetched data
      const initialState: InitialGameState = {
        userTelegramInitData: initData,
        userTelegramName: telegramName,
        lastClickTimestamp: userData.lastPointsUpdateTimestamp,
        gameLevelIndex: calculateLevelIndex(userData.points),
        points: userData.points,
        pointsBalance: userData.pointsBalance,
        unsynchronizedPoints: 0,
        multitapLevelIndex: userData.multitapLevelIndex,
        pointsPerClick: calculatePointsPerClick(userData.multitapLevelIndex),
        energy: userData.energy,
        maxEnergy: calculateEnergyLimit(userData.energyLimitLevelIndex),
        energyRefillsLeft: userData.energyRefillsLeft,
        energyLimitLevelIndex: userData.energyLimitLevelIndex,
        lastEnergyRefillTimestamp: userData.lastEnergyRefillsTimestamp,
        mineLevelIndex: userData.mineLevelIndex,
        profitPerHour: calculateProfitPerHour(userData.mineLevelIndex),
        tonWalletAddress: userData?.tonWalletAddress,
      };

      console.log("Initial state: ", initialState);

      initializeState(initialState);
      setIsDataLoaded(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error (e.g., show error message to user)
    }
  }, [initializeState]);

  useEffect(() => {
    fetchOrCreateUser();
  }, [fetchOrCreateUser]);

  useEffect(() => {
    if (isDataLoaded) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - openTimestampRef.current;
      const remainingTime = Math.max(3000 - elapsedTime, 0);

      const timer = setTimeout(() => {
        setCurrentView('game');
        setIsInitialized(true);
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, [isDataLoaded, setIsInitialized, setCurrentView]);

  return (
    <div className=" flex justify-center items-center h-screen">
      
    <Image src={test} alt="Exchange" className="sotpacoin" />
 
  <div
    className="w-full max-w-xl text-white flex flex-col items-center"
    style={{ zIndex: "1" }}
  >
    <div className="w-64 h-64  p-2 mb-8">
      {/* <div className="w-full h-full rounded-full circle-inner overflow-hidden relative">
        <Image
          src={mainCharacter}
          alt="Main Character"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(-1) translateY(0%)'
          }}
        />
      </div> */}
    </div>
{/* 
    <h1 className="font-bold my-2 delay-100" style={{marginTop:"20px",fontSize:"60px",color:"goldenrod",textShadow:"4px 4px 27px rgba(0,0,0,0.6)"}}> </h1>
    <h1 className="font-bold my-2 delay-100" style={{marginTop:"20px",fontSize:"60px",color:"goldenrod",textShadow:"4px 4px 27px rgba(0,0,0,0.6)"}}> </h1>
    <h1 className="font-bold my-2 delay-100" style={{marginTop:"20px",fontSize:"60px",color:"goldenrod",textShadow:"4px 4px 27px rgba(0,0,0,0.6)"}}> </h1>
    <h1 className="font-bold my-2 delay-100" style={{marginTop:"20px",fontSize:"60px",color:"goldenrod",textShadow:"4px 4px 27px rgba(0,0,0,0.6)"}}> </h1>
    <h1 className="font-bold my-2 delay-100" style={{marginTop:"20px",fontSize:"60px",color:"goldenrod",textShadow:"4px 4px 27px rgba(0,0,0,0.6)"}}> </h1>
    <h1 className="font-bold my-2 delay-100" style={{marginTop:"20px",fontSize:"60px",color:"goldenrod",textShadow:"4px 4px 27px rgba(0,0,0,0.6)"}}> </h1>
    <h1 className="font-bold my-2 delay-100" style={{marginTop:"20px",fontSize:"60px",color:"goldenrod",textShadow:"4px 4px 27px rgba(0,0,0,0.6)"}}> </h1>
    <h1 className="font-bold my-2 delay-100" style={{marginTop:"20px",fontSize:"60px",color:"goldenrod",textShadow:"4px 4px 27px rgba(0,0,0,0.6)"}}> </h1> */}
    <section>
     
      <div className="loading loading07">
        <span data-text="L">L</span>
        <span data-text="O">O</span>
        <span data-text="A">A</span>
        <span data-text="D">D</span>
        <span data-text="I">I</span>
        <span data-text="N">N</span>
        <span data-text="G">G</span>
      </div>
    </section>

    <div
      className="flex items-center space-x-2"
      style={{
        position: "absolute",
        left: "50%",
        top: "80%",
        transform: "translate(-50%,-50%)",
      }}
    >
        <Link href={'https://x.com/RealCapyHouse'} target="_blank">
        <Image src={twitter} alt="Exchange" className="w-12 h-12 animate-pulse delay-100" />
        </Link>
       
        <Link href={'https://youtube.com/'}>
        <Image src={youtube} alt="Exchange" className="w-12 h-12 animate-pulse delay-100 mx-4"/>
        </Link>
      
        <Link href={'https://t.me/Capy_CommunityBot'}>
        <Image src={telegram} alt="Exchange" className="w-12 h-12 animate-pulse delay-100"/>
        </Link>
       
    </div>
  </div>
</div>
  );
}
