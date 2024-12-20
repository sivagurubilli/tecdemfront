import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './Leftbar.module.css';
import { SupportTopics } from '../../Config';

const Leftbar = () => {
  return (
    <div className={Styles.leftbar}>
      <h5>Topics</h5>
      <ul className={Styles.topicList}>
        {SupportTopics.map((topic, index) => (
          <li key={index} className={Styles.topicItem}>
            <Link to={topic.link} className={Styles.topicLink}>
              {topic.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leftbar;