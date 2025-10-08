'use client';

import React, { useState, useEffect } from 'react';

// Define types
interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  icon: string;
  priority: string;
  actionUrl?: string;
}

interface Animal {
  name: string;
  species: string;
}

interface Visit {
  date: string;
  ticket_type: string;
  booking_id: string;
}

interface User {
  email: string;
  first_name: string;
  favourite_animals: string[];
  member: boolean;
  membership_type?: string;
  membership_start_date?: string;
  upcoming_visits: Visit[];
}

interface Event {
  id: string;
  title: string;
  date: string;
  start_time: string;
  animals_featured: string[];
}

// Icon components
const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const GiftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Props interface for the component
interface NotificationSystemProps {
  user?: User | null;
  animals?: Record<string, Animal>;
  events?: Event[];
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ 
  user = null,
  animals = {},
  events = []
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const [activePopup, setActivePopup] = useState<Notification | null>(null);

  useEffect(() => {
  // Don't show notifications if user is not logged in
  if (!user) return;

  const generatedNotifications: Notification[] = [];
  const today = new Date();
  
  // Calculate dates for the next 7 days
  const oneWeekFromNow = new Date(today);
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

  // Check for upcoming visits (exactly 7 days away)
  user.upcoming_visits?.forEach(visit => {
    const visitDate = new Date(visit.date);
    const daysUntilVisit = Math.ceil((visitDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilVisit === 7) {
      generatedNotifications.push({
        id: `visit-${visit.booking_id}`,
        type: 'visit',
        title: 'Upcoming Visit Reminder',
        message: `Your visit to Zoolirante is in 7 days (${visit.date})! Booking ID: ${visit.booking_id}`,
        timestamp: new Date(),
        icon: 'calendar',
        priority: 'high'
      });
    }
  });

  // Check for events with favourite animals (within 7 days)
  events.forEach(event => {
    const eventDate = new Date(event.date);
    const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Only show notifications for events 1-7 days away
    if (daysUntilEvent >= 1 && daysUntilEvent <= 7) {
      const featuredFavs = event.animals_featured.filter(id => 
        user.favourite_animals?.includes(id)
      );
      
      if (featuredFavs.length > 0) {
        const animalNames = featuredFavs.map(id => animals[id]?.name).filter(Boolean).join(' and ');
        const daysText = daysUntilEvent === 1 ? 'tomorrow' : `in ${daysUntilEvent} days`;
        
        generatedNotifications.push({
          id: `event-${event.id}`,
          type: 'event',
          title: 'Favourite Animal Event',
          message: `${animalNames} will be featured in "${event.title}" ${daysText} (${event.date}) at ${event.start_time}!`,
          timestamp: new Date(),
          icon: 'heart',
          priority: daysUntilEvent <= 3 ? 'high' : 'medium',
          actionUrl: '#events'
        });
      }
    }
  });

  // Check for monthly membership benefits
  if (user.member && user.membership_start_date) {
    const membershipStart = new Date(user.membership_start_date);
    const dayOfMonth = today.getDate();
    const startDay = membershipStart.getDate();
    
    if (dayOfMonth === startDay) {
      generatedNotifications.push({
        id: 'membership-benefit',
        type: 'benefit',
        title: 'Monthly Membership Benefit',
        message: `It's your membership anniversary! This month enjoy priority event booking and exclusive member experiences.`,
        timestamp: new Date(),
        icon: 'gift',
        priority: 'medium'
      });
    }
  }

  setNotifications(generatedNotifications);

  // Show high priority popup after 2 seconds if there are new notifications
  const highPriorityNotif = generatedNotifications.find(n => n.priority === 'high');
  if (highPriorityNotif) {
    const timer = setTimeout(() => {
      setActivePopup(highPriorityNotif);
    }, 2000);
    
    return () => clearTimeout(timer);
  }
}, [user, animals, events]);

  const getIcon = (iconType: string) => {
    switch(iconType) {
      case 'heart': return <HeartIcon className="w-5 h-5" />;
      case 'calendar': return <CalendarIcon className="w-5 h-5" />;
      case 'gift': return <GiftIcon className="w-5 h-5" />;
      case 'info': return <InfoIcon className="w-5 h-5" />;
      default: return <BellIcon className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-blue-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (activePopup?.id === id) {
      setActivePopup(null);
    }
  };

  const unreadCount = notifications.length;

  // Don't render anything if user is not logged in
  if (!user) return null;

  return (
    <>
      {/* Notification Bell - Fixed position */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed top-4 right-4 z-50 p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all transform hover:scale-110 shadow-lg"
        aria-label="Notifications"
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {showPanel && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={() => setShowPanel(false)}
          />
          
          {/* Panel */}
          <div className="fixed top-20 right-4 w-96 bg-white rounded-lg shadow-2xl z-50 max-h-96 overflow-hidden">
            <div className="bg-green-600 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <BellIcon className="w-5 h-5" />
                Notifications
              </h3>
              <button
                onClick={() => setShowPanel(false)}
                className="hover:bg-green-700 p-1 rounded"
                aria-label="Close notifications"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-80">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <BellIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map(notif => (
                  <div
                    key={notif.id}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`${getPriorityColor(notif.priority)} text-white p-2 rounded-full flex-shrink-0`}>
                        {getIcon(notif.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm">{notif.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notif.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <button
                        onClick={() => dismissNotification(notif.id)}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Dismiss notification"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Popup Notification */}
      {activePopup && (
        <div className="fixed bottom-8 right-8 w-96 bg-white rounded-lg shadow-2xl z-50 animate-bounce">
          <div className={`${getPriorityColor(activePopup.priority)} text-white p-4 rounded-t-lg flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              {getIcon(activePopup.icon)}
              <h3 className="font-bold">{activePopup.title}</h3>
            </div>
            <button
              onClick={() => setActivePopup(null)}
              className="hover:bg-white/20 p-1 rounded"
              aria-label="Close popup"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-gray-700">{activePopup.message}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setActivePopup(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded transition-colors"
              >
                Dismiss
              </button>
              {activePopup.actionUrl && (
                <button
                  onClick={() => {
                    setActivePopup(null);
                    // Navigate to the action URL
                    if (activePopup.actionUrl) {
                        window.location.hash = activePopup.actionUrl;
                      }
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationSystem;