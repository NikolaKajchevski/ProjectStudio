// NotificationSender.tsx

"use client";

import { useEffect } from "react";
import emailjs from "@emailjs/browser";
import zooData from "../../data/zooliranteData.json";

export default function NotificationSender() {
  useEffect(() => {
    const sendNotifications = () => {
      const today = new Date();
      const oneWeekFromNow = new Date();
      oneWeekFromNow.setDate(today.getDate() + 7);

      zooData.users.forEach((user) => {
        const upcomingFavouriteEvents = zooData.events.filter((event) => {
          const eventDate = new Date(event.date);
          return (
            event.animals_featured.some((id) =>
              user.favourite_animals.includes(id)
            ) &&
            eventDate >= today &&
            eventDate <= oneWeekFromNow
          );
        });

        const upcomingVisits = user.visit_history.filter((visit) => {
          const visitDate = new Date(visit.date);
          return visitDate >= today && visitDate <= oneWeekFromNow;
        });

        if (upcomingFavouriteEvents.length === 0 && upcomingVisits.length === 0)
          return;

        const formatDate = (date: string | number | Date) =>
          new Date(date).toLocaleDateString();

        let message = `Hi ${user.first_name},\n\n`;

        if (upcomingFavouriteEvents.length > 0) {
          message += `🐾 Events featuring your favourite animals this week:\n`;
          upcomingFavouriteEvents.forEach((event) => {
            message += `• "${event.title}" on ${formatDate(
              event.date
            )} at ${event.location}\n`;
          });
          message += "\n";
        }

        if (upcomingVisits.length > 0) {
          message += `📅 Reminders for your upcoming visits this week:\n`;
          upcomingVisits.forEach((visit) => {
            const visitEvents = zooData.events.filter((event) =>
              visit.special_events.includes(event.id)
            );
            visitEvents.forEach((event) => {
              message += `• "${event.title}" on ${formatDate(
                event.date
              )} at ${event.location}\n`;
            });
          });
          message += "\n";
        }

        message += `🎁 This month's member benefit: Free souvenir photo at any event!\n\nSee you soon,\nZoolirante Team 🦘`;

        const templateParams = {
          to_name: user.first_name,
          to_email: user.email,
          message,
        };

        emailjs
          .send(
            "service_rz5dvua",
            "template_xrkqwwz",
            templateParams,
            "xcxMvt-bjNmhYQVQx"
          )
          .then(
            (result) =>
              console.log(`✅ Email sent to ${user.email}:`, result.text),
            (error) =>
              console.error(`❌ Failed to send to ${user.email}:`, error.text)
          );
      });

      console.log("✅ Automatic notifications sent!");
    };

    sendNotifications();
  }, []);

  return null; // 👈 Renders nothing on the screen
}
