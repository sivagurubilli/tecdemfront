// Account.js
import React, { useState } from 'react';
import Styles from "./Account.module.css";
import Leftbar from '../LeftBar/Leftbar';
import { Link } from 'react-router-dom';
import { AccountTopics } from '../../Config';
import { Text } from '@chakra-ui/react';

const Account = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter topics based on the search term
  const filteredTopics = AccountTopics.filter((topic) =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to highlight the search term in the results
  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className={Styles.highlight}>{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <div className={Styles.breadcrumbs}>
          <Link to={"/support"}>
          Home 
          </Link>
          &nbsp;&gt;&nbsp; 
          <Link to={"/accountandprofile"}>
          Account & Profile
          </Link>
        </div>
        <div className={Styles.Search}>
          <h1 className={Styles.title}>Account & Profile</h1>
          <div className={Styles?.SearchTerm}>
          <input
            type="text"
            className={Styles.searchBar}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          { searchTerm &&
            <Text className={Styles?.Terms}>
            {filteredTopics.map((topic, index) => (
              <p key={index} className={Styles?.term}>
                <Link to={topic.link} >
                  {highlightText(topic.name, searchTerm)}
                </Link>
              </p>
            ))}
          </Text>
          }
          </div>
        </div>
      </div>
      <div className={Styles.accountContainer}>
        <Leftbar />
        <div className={Styles.content}>
          <h2>Account & Profile</h2>
          <ul className={Styles.topicList}>
          {AccountTopics.map((topic, index) => (
          <li key={index} className={Styles?.topicItem}>
            <Link to={topic.link} className={Styles?.topicLink}>
              {topic.name}
            </Link>
          </li>
        ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;
