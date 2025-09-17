"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Membership {
    name: string;
}

export default function MembershipConfirmationPage() {

    const [membership, setMembership] = useState<Membership | null>(null);

    useEffect(() => {
        const storedMembership = localStorage.getItem("latestBooking");
        
        if (storedMembership) {
            setMembership(JSON.parse(storedMembership));
        }}, []);
        
        // No booking found
        if (!membership) {
            return (
            <div className="min-h-screen flex flex-col items-center pt-16 space-y-4">
                <p className="text-black">No membership found.</p>
                <Link href="/membership">
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                        Book Now!
                    </button>
                </Link>
            </div>
            );
        }

    const membershipStartDate = new Date();

    const membershipEndDate = new Date(membershipStartDate);
    membershipEndDate.setFullYear(membershipStartDate.getFullYear() + 1); // This day next year

    // Format both dates in MM / DD / YYYY
    const membershipStartDateFormatted = membershipStartDate.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    });

    const membershipEndDateFormatted = membershipEndDate.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    });    
    
  return (
    <div className="min-h-screen flex flex-col items-center pt-16 space-y-4">
                <h1 className=" text-xl font-bold text-black">Membership Successful!</h1>
                <p> Welcome to the jungle, {membership.name}. Your membership is valid from {membershipStartDateFormatted} - {membershipEndDateFormatted}.</p>
                <Link href="/">
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                        Explore
                    </button>
                </Link>
            </div>
)};


