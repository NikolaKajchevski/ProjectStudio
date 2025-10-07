"use client"; 

import { useEffect } from "react";
import emailjs from "@emailjs/browser";
import zooData from "../data/zooliranteData.json"; 

export default function NotificationSender() {

  const formatDate = (date: string | number | Date) =>
    new Date(date).toISOString().split("T")[0];

  useEffect(() => {
    const today = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);

    zooData.users.forEach(user => {
      // Events with user's favourite animals within 1 week
      const upcomingFavouriteEvents = zooData.events.filter(event => {
        const eventDate = new Date(event.date);
        return (
          event.animals_featured.some(id => user.favourite_animals.includes(id)) &&
          eventDate >= today &&
          eventDate <= oneWeekFromNow
        );
      });

      // Visits within 1 week
      const upcomingVisits = user.visit_history.filter(visit => {
        const visitDate = new Date(visit.date);
        return visitDate >= today && visitDate <= oneWeekFromNow;
      });

      if (upcomingFavouriteEvents.length === 0 && upcomingVisits.length === 0) return;

      // Build message
      let message = `Hi ${user.first_name},\n\n`;

      if (upcomingFavouriteEvents.length > 0) {
        message += `🐾 Events featuring your favourite animals this week:\n`;
        upcomingFavouriteEvents.forEach(event => {
          message += `• ${event.title} on ${event.date} at ${event.location}\n`;
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

  }, []);

  return (
    <div className="p-6 space-y-4 max-w-lg mx-auto border rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold">Zoo Email Notification System</h2>
      <p>Emails for upcoming events within one week are sent automatically.</p>
    </div>
  );
}
