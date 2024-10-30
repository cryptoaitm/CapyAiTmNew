"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image"; 
import { useGameStore } from "@/utils/game-mechanics";
import { 
  mainCharacter,
  rankingOne,
  rankingTwo,
  rankingThree,
} from "@/images"; 
import { formatNumber } from "@/utils/ui"; 
import { useToast } from "@/contexts/ToastContext"; 

interface User {
  _id: string;
  telegramId: string;
  name: string;
  isPremium: boolean;
  points: number;
  pointsBalance: number;
  multitapLevelIndex: number;
  energy: number;
  energyRefillsLeft: number;
  energyLimitLevelIndex: number;
  mineLevelIndex: number;
  lastPointsUpdateTimestamp: Date | null;
  lastEnergyUpdateTimestamp: Date | null;
  lastEnergyRefillsTimestamp: Date | null;
  referralPointsEarned: number;
  offlinePointsEarned: number;
}

export default function Friends() {
  const showToast = useToast();

  const { userTelegramInitData } = useGameStore(); 
  const [referrals, setReferrals] = useState<User[]>([]);
  const [referralCount, setReferralCount] = useState();
  const [isLoadingReferrals, setIsLoadingReferrals] = useState(true); 

  const fetchReferrals = useCallback(async () => {
    setIsLoadingReferrals(true);
    try {
      const response = await fetch(
        `/api/user/users?initData=${encodeURIComponent(userTelegramInitData)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch referrals");
      }
      const data = await response.json();
      const alveri = data.dbUser;
      for (let index = 0; index <= 1000; index++) {
        const element = alveri[index];
        var datamm = alveri.sort(function (a: any, b: any) {
          return b.pointsBalance + b.points - (a.pointsBalance + a.points);
        });
      }

      setReferrals(datamm);
      setReferralCount(datamm.length);
    } catch (error) {
      console.error("Error fetching referrals:", error);
      showToast("Failed to fetch referrals. Please try again later.", "error");
    } finally {
      setIsLoadingReferrals(false);
    }
  }, [userTelegramInitData, showToast]);

  useEffect(() => {
    fetchReferrals();
  }, [fetchReferrals]);

  return (
    <div className="bg-black flex justify-center min-h-screen">
      <div className="w-full bg-black text-white font-bold flex flex-col max-w-xl">
        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="mt-[2px] bg-[#1d2025] rounded-t-[46px] h-full overflow-y-auto no-scrollbar">
            <div className="px-4 pt-1 pb-36">
              <div className="relative">
                <h1 className="text-2xl text-center mt-4 mb-2">Rank!</h1>
                <p className="text-center text-gray-400 mb-8">List of ranks</p>

                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg">
                     First 1000 list of ranks
                       ({referralCount}0) 
                    </h2>
                    <svg
                      className="w-6 h-6 text-gray-400 cursor-pointer"
                      onClick={fetchReferrals}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div className="mt-4 space-y-2">
                    {isLoadingReferrals ? (
                      // Skeleton loading animation
                      <div className="space-y-2 animate-pulse">
                        {[...Array(10)].map((_, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center bg-[#272a2f] rounded-lg p-4"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                              <div className="space-y-2">
                                <div className="h-4 bg-gray-700 rounded w-24"></div>
                                <div className="h-3 bg-gray-700 rounded w-20"></div>
                              </div>
                            </div>
                            <div className="h-4 bg-gray-700 rounded w-16"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <ul className="space-y-2">
                          {referrals.slice(0, 1).map((rank: User) => (
                            <>
                              <li
                                key={rank.name}
                                className="flex justify-between items-center bg-[#000000] border border-lg rounded-lg p-4"
                              >
                                <div className="flex items-center space-x-3">
                                  <Image
                                    src={rankingOne}
                                    alt=""
                                    width={80}
                                    height={80}
                                    className="rounded-full"
                                  />
                                  <div>
                                    <span className="font-medium">
                                      {rank.name || `User ${rank.telegramId}`}
                                    </span>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Points: {formatNumber(rank.points)}{" "}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Referral :{" "}
                                      {formatNumber(
                                        rank.referralPointsEarned
                                      )}{" "}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Level:{" "}
                                      {formatNumber(rank.mineLevelIndex)}{" "}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Per hour:{" "}
                                      {formatNumber(
                                        rank.offlinePointsEarned
                                      )}{" "}
                                    </p> 
                                  </div>
                                </div>
                                <span className="text-[#f3ba2f]">
                                  +
                                  {formatNumber(
                                    rank.pointsBalance + rank.points
                                  )}
                                </span>
                              </li>
                            </>
                          ))}

                          {referrals.slice(1, 2).map((rank: User) => (
                            <>
                              <li
                                key={rank.name}
                                className="flex justify-between items-center bg-[#000000] border border-lg rounded-lg p-4"
                              >
                                <div className="flex items-center space-x-3">
                                  <Image
                                    src={rankingTwo}
                                    alt=""
                                    width={80}
                                    height={80}
                                    className="rounded-full"
                                  />
                                  <div>
                                    <span className="font-medium">
                                      {rank.name || `User ${rank.telegramId}`}
                                    </span>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Points: {formatNumber(rank.points)}{" "}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Referral :{" "}
                                      {formatNumber(
                                        rank.referralPointsEarned
                                      )}{" "}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Level:{" "}
                                      {formatNumber(rank.mineLevelIndex)}{" "}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Per hour:{" "}
                                      {formatNumber(
                                        rank.offlinePointsEarned
                                      )}{" "}
                                    </p> 
                                  </div>
                                </div>
                                <span className="text-[#f3ba2f]">
                                  +
                                  {formatNumber(
                                    rank.pointsBalance + rank.points
                                  )}
                                </span>
                              </li>
                            </>
                          ))}

                          {referrals.slice(2, 3).map((rank: User) => (
                            <>
                              <li
                                key={rank.name}
                                className="flex justify-between items-center bg-[#000000] border border-lg rounded-lg p-4"
                              >
                                <div className="flex items-center space-x-3">
                                  <Image
                                    src={rankingThree}
                                    alt=""
                                    width={80}
                                    height={80}
                                    className="rounded-full"
                                  />
                                  <div>
                                    <span className="font-medium">
                                      {rank.name || `User ${rank.telegramId}`}
                                    </span>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Points: {formatNumber(rank.points)}{" "}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Referral :{" "}
                                      {formatNumber(
                                        rank.referralPointsEarned
                                      )}{" "}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Level:{" "}
                                      {formatNumber(rank.mineLevelIndex)}{" "}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Per hour:{" "}
                                      {formatNumber(
                                        rank.offlinePointsEarned
                                      )}{" "}
                                    </p> 
                                  </div>
                                </div>
                                <span className="text-[#f3ba2f]">
                                  +
                                  {formatNumber(
                                    rank.pointsBalance + rank.points
                                  )}
                                </span>
                              </li>
                            </>
                          ))}

                          {referrals.slice(3).map((rank: User) => (
                            <>
                              <li
                                key={rank.name}
                                className="flex justify-between items-center bg-[#000000] border border-lg rounded-lg p-4"
                              >
                                <div className="flex items-center space-x-3">
                                  <Image
                                    src={mainCharacter}
                                    alt=""
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                  />
                                  <div>
                                    <span className="font-medium">
                                      {rank.name || `User ${rank.telegramId}`}
                                    </span>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Points: {formatNumber(rank.points)}{" "}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Referral :{" "}
                                      {formatNumber(
                                        rank.referralPointsEarned
                                      )}{" "}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Level:{" "}
                                      {formatNumber(rank.mineLevelIndex)}{" "}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {" "}
                                      • Per hour:{" "}
                                      {formatNumber(
                                        rank.offlinePointsEarned
                                      )}{" "}
                                    </p> 
                                  </div>
                                </div>
                                <span className="text-[#f3ba2f]">
                                  +
                                  {formatNumber(
                                    rank.pointsBalance + rank.points
                                  )}
                                </span>
                              </li>
                            </>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
