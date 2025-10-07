"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import zooData from "../data/zooliranteData.json";

export default function NotificationSender() {
  const [status, setStatus] = useState<string>("");

  const formatDate = (date: string | number | Date) =>
    new Date(date).toISOString().split("T")[0];

  const sendNotifications = () => {
    setStatus("Sending notifications...");

    const today = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);

    zooData.users.forEach(user => {
      const upcomingFavouriteEvents = zooData.events.filter(event => {
        const eventDate = new Date(event.date);
        return (
          event.animals_featured.some(id => user.favourite_animals.includes(id)) &&
          eventDate >= today &&
          eventDate <= oneWeekFromNow
        );
      });

      const upcomingVisits = user.visit_history.filter(visit => {
        const visitDate = new Date(visit.date);
        return visitDate >= today && visitDate <= oneWeekFromNow;
      });

      if (upcomingFavouriteEvents.length === 0 && upcomingVisits.length === 0) return;

      let message = `Hi ${user.first_name},\n\n`;

      if (upcomingFavouriteEvents.length > 0) {
        message += `🐾 Events featuring your favourite animals this week:\n`;
        upcomingFavouriteEvents.forEach(event => {
          message += `• ${event.title} on ${formatDate(event.date)} at ${event.location}\n`;
        });
        message += "\n";
      }

      if (upcomingVisits.length > 0) {
        message += `📅 Reminder: You have a visit booked this week!\n\n`;
      }

      message += `🎁 This month's member benefit: Free souvenir photo at any event!\n\n`;
      message += `See you soon,\nZoolirante Team 🦘`;

      const templateParams = {
        to_name: user.first_name,
        to_email: user.email,
        message
      };

      emailjs.send(
        "service_mx95jbu",
        "template_xrkqwwz",
        templateParams,
        "xcxMvt-bjNmhYQVQx"
      )
      .then(
        result => console.log(`✅ Sent to ${user.email}:`, result.text),
        error => console.error(`❌ Failed for ${user.email}:`, error.text)
      );
    });

    setStatus("Notifications sent! Check console for details.");
  };

  return (
    <div className="p-6 space-y-4 max-w-lg mx-auto border rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold">Zoo Email Notification System</h2>
      <p>Click the button below to send emails for upcoming events within one week.</p>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        onClick={sendNotifications}
      >
        Send Notifications
      </button>
      {status && <p className="text-gray-700 mt-2">{status}</p>}
    </div>
  );
}
