import React from 'react'
import Styles from "./SettingNotification.module.css"

const SettingNotification = () => {
  return (
    <div className={Styles?.container}>
      <h1 className={Styles?.heading}>Notification Settings</h1>
      <p className={Styles?.subHeading}>
        We may still send you important notifications about your account outside of your notification settings.
      </p>
      
      <section className={Styles?.section}>
        <div className={Styles?.sectionHeaderBar}>
        <h2 className={Styles?.sectionHeading}>Notification from us</h2>
        <p className={Styles?.sectionSubHeading}>Stay informed about the latest course updates</p>
        </div>
        <div className={Styles?.checkboxContainer}>
          <label className={Styles?.checkboxLabel}>
            <div className={Styles?.Checklist}>
            <input type="checkbox"  />
            Course updates
            </div>
            <span className={Styles?.checkboxDescription}>News about course and feature updates.</span>

          </label>
          <label className={Styles?.checkboxLabel}>
          <div className={Styles?.Checklist}>
            <input type="checkbox"  />
            Platform announcements
          </div>
          </label>
        </div>
      </section>
      
      <section className={Styles?.section}>
      <div className={Styles?.sectionHeaderBar}>
        <h2 className={Styles?.sectionHeading}>Comments</h2>
        <p className={Styles?.sectionSubHeading}>Get notified when someone comments on your posts or replies to your comments.</p>
        </div>
        <div className={Styles?.checkboxContainer}>
          <label className={Styles?.checkboxLabel}>
          <div className={Styles?.Checklist}>
            <input type="checkbox"  />
            Comments on Courses
          </div>
          </label>
          <label className={Styles?.checkboxLabel}>
          <div className={Styles?.Checklist}>
            <input type="checkbox"  />
            Replies to comments
          </div>
          </label>
          <label className={Styles?.checkboxLabel}>
          <div className={Styles?.Checklist}>
            <input type="checkbox"  />
            All comments
          </div>
          </label>
        </div>
      </section>
      
      <section className={Styles?.section}>
      <div className={Styles?.sectionHeaderBar}>

        <h2 className={Styles?.sectionHeading}>Reminder</h2>
        <p className={Styles?.sectionSubHeading}>There are notifications to remind you of updates you might have missed.</p>
      </div>
        <div className={Styles?.checkboxContainer}>
          <label className={Styles?.checkboxLabel}>
          <div className={Styles?.Checklist}>
            <input type="checkbox"  />
            Course schedules
          </div>
          </label>
          <label className={Styles?.checkboxLabel}>
          <div className={Styles?.Checklist}>
            <input type="checkbox"  />
            Achievements
          </div>
          </label>
          <label className={Styles?.checkboxLabel}>
          <div className={Styles?.Checklist}>
            <input type="checkbox"  />
            iFlow
          </div>
          </label>
        </div>
      </section>
      
      <section className={Styles?.section}>
      <div className={Styles?.sectionHeaderBar}>

        <h2 className={Styles?.sectionHeading}>More activity about you</h2>
        <p className={Styles?.sectionSubHeading}>Get alerts when you get messages and recommended courses</p>
      </div>
        <div className={Styles?.checkboxContainer}>
          <label className={Styles?.checkboxLabel}>
          <div className={Styles?.Checklist}>
            <input type="checkbox"  />
            Mentor Message
          </div>
          </label>
          <label className={Styles?.checkboxLabel}>
          <div className={Styles?.Checklist}>
            <input type="checkbox"  />
            Mentor Courses
          </div>
          </label>
          <label className={Styles?.checkboxLabel}>
          <div className={Styles?.Checklist}>
            <input type="checkbox"  />
            All Messages
          </div>
          </label>
          <label className={Styles?.checkboxLabel}>
          <div className={Styles?.Checklist}>
            <input type="checkbox" />
            Recommended Courses
          </div>
          </label>
        </div>
      </section>
    </div>
  )
}

export default SettingNotification