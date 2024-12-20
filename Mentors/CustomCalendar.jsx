import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import styles from './customCalendar.module.css';
import EventModal from './EventModal';
import EventDetailsModal from './EventDetailsModal';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CustomCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: null, end: null, description: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectSlot = ({ start }) => {
    setNewEvent({ title: '', start, end: start, description: '' });
    setShowModal(true);
  };
  const handleSaveEvent = (event) => {
    setEvents([...events, event]);
    setShowModal(false);
  };

  const moveEvent = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    setEvents(events.map(e => (e === event ? updatedEvent : e)));
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter(e => e !== selectedEvent));
    setShowDetailsModal(false);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map(e => (e === selectedEvent ? updatedEvent : e)));
    setShowDetailsModal(false);
  };

  return (
    <div className={styles.container}>
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        selectable
        onEventDrop={moveEvent}
        onEventResize={moveEvent}
        onSelectEvent={handleEventClick}
      />

      {showModal && (
        <EventModal
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          handleSaveEvent={handleSaveEvent}
          setShowModal={setShowModal}
        />
      )}

      {showDetailsModal && selectedEvent && (
        <EventDetailsModal
          selectedEvent={selectedEvent}
          handleEditEvent={handleEditEvent}
          handleDeleteEvent={handleDeleteEvent}
          setShowDetailsModal={setShowDetailsModal}
        />
      )}
    </div>
  );
};

export default CustomCalendar;
