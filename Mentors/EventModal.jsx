import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import momentTimezone from 'moment-timezone';
import styles from './customCalendar.module.css';

const EventModal = ({ newEvent, setNewEvent, handleSaveEvent, setShowModal }) => {
  

    const handleSave = () => {
        if (!newEvent.title || !newEvent.start || !newEvent.end) {
          alert('Please complete all fields.');
          return;
        }
        if (newEvent.end < newEvent.start) {
          alert('End time cannot be before start time.');
          return;
        }
    
        const eventWithUtcTimes = {
          ...newEvent,
          start: momentTimezone(newEvent.start).utc().format(),
          end: momentTimezone(newEvent.end).utc().format(),
        };
    
        handleSaveEvent(eventWithUtcTimes);
        setShowModal(false); 
      };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>New Event</h3>
          <button className={styles.closeModal} onClick={() => setShowModal(false)}>×</button>
        </div>
        <div className={styles.modalBody}>
          <input
            className={styles.input}
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <DatePicker
            selected={newEvent.start}
            onChange={(date) => setNewEvent({ ...newEvent, start: date })}
            showTimeSelect
            dateFormat="Pp"
            className={styles.input}
          />
          <DatePicker
            selected={newEvent.end}
            onChange={(date) => setNewEvent({ ...newEvent, end: date })}
            showTimeSelect
            dateFormat="Pp"
            className={styles.input}
          />
          <textarea
            className={styles.textarea}
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
        </div>
        <div className={styles.modalActions}>
          <button className={`${styles.saveButton} ${styles.button}`} onClick={handleSave}>Save</button>
          <button className={`${styles.cancelButton} ${styles.button}`} onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
