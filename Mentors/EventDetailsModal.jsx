import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import momentTimezone from 'moment-timezone';
import styles from './customCalendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const EventDetailsModal = ({ selectedEvent, handleEditEvent, handleDeleteEvent, setShowDetailsModal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(selectedEvent);

  const handleSaveEdit = () => {
    if (!editedEvent.title || !editedEvent.start || !editedEvent.end) {
      alert('Please complete all fields.');
      return;
    }
    if (editedEvent.end < editedEvent.start) {
      alert('End time cannot be before start time.');
      return;
    }
    
    handleEditEvent(editedEvent);
    setIsEditing(false);
  };

  return (
    <div className={styles.detailsModal}>
      <div className={styles.detailsModalContent}>
        <div className={styles.detailsModalHeader}>
          <h3 className={styles.detailsModalTitle}>{isEditing ? 'Edit Event' : selectedEvent.title}</h3>
          <button className={styles.detailsCloseModal} onClick={() => setShowDetailsModal(false)}>×</button>
        </div>
        <div className={styles.detailsModalBody}>
          {isEditing ? (
            <>
              <input
                className={styles.input}
                type="text"
                value={editedEvent.title}
                onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
              />
              <DatePicker
                selected={momentTimezone(editedEvent.start).toDate()}
                onChange={(date) => setEditedEvent({ ...editedEvent, start: date })}
                showTimeSelect
                dateFormat="Pp"
                className={styles.input}
              />
              <DatePicker
                selected={momentTimezone(editedEvent.end).toDate()}
                onChange={(date) => setEditedEvent({ ...editedEvent, end: date })}
                showTimeSelect
                dateFormat="Pp"
                className={styles.input}
              />
              <textarea
                className={styles.textarea}
                value={editedEvent.description}
                onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
              />
            </>
          ) : (
            <>
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <p><strong>Start:</strong> {momentTimezone(selectedEvent.start).format('LLL')}</p>
              <p><strong>End:</strong> {momentTimezone(selectedEvent.end).format('LLL')}</p>
            </>
          )}
        </div>
        <div className={styles.detailsModalActions}>
          {isEditing ? (
            <>
              <button className={styles.saveButton} onClick={handleSaveEdit}>Save</button>
              <button className={styles.cancelButton} onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <button className={styles.detailsEditButton} onClick={() => setIsEditing(true)}>Edit</button>
              <button className={styles.detailsDeleteButton} onClick={handleDeleteEvent}>Delete</button>
              <button className={styles.detailsEmailButton}>Email</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
