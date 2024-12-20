import React, { useState } from 'react';
import c1 from '../img/img1.jpeg'

const courses = [
  {
    id: 1,
    title: 'React for Beginners',
    description: 'Learn the basics of React.',
    price: '$19.99',
    imageUrl: 'https://via.placeholder.com/300/0000FF/808080?text=React+Course'
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Deep dive into JavaScript concepts.',
    price: '$29.99',
    imageUrl: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=JavaScript+Course'
  },
  {
    id: 3,
    title: 'CSS Masterclass',
    description: 'Master CSS and design beautiful websites.',
    price: '$15.99',
    imageUrl: 'https://via.placeholder.com/300/00FF00/000000?text=CSS+Course'
  },
  {
    id: 1,
    title: 'React for Beginners',
    description: 'Learn the basics of React.',
    price: '$19.99',
    imageUrl: 'https://via.placeholder.com/300/0000FF/808080?text=React+Course'
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Deep dive into JavaScript concepts.',
    price: '$29.99',
    imageUrl: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=JavaScript+Course'
  },
  {
    id: 3,
    title: 'CSS Masterclass',
    description: 'Master CSS and design beautiful websites.',
    price: '$15.99',
    imageUrl: 'https://via.placeholder.com/300/00FF00/000000?text=CSS+Course'
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Deep dive into JavaScript concepts.',
    price: '$29.99',
    imageUrl: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=JavaScript+Course'
  },
  {
    id: 3,
    title: 'CSS Masterclass',
    description: 'Master CSS and design beautiful websites.',
    price: '$15.99',
    imageUrl: 'https://via.placeholder.com/300/00FF00/000000?text=CSS+Course'
  }
];

const WishList = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState({});

  const addToCart = (course) => {
    setCart([...cart, course]);
  };

  const toggleFavorite = (courseId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [courseId]: !prevFavorites[courseId]
    }));
  };

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      padding: '20px',
      justifyContent: 'center'
    },
    card: {
      position: 'relative',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '10px',
      maxWidth: '300px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      transition: 'transform 0.3s ease-in-out'
    },
    cardHover: {
      transform: 'scale(1.05)'
    },
    image: {
      width: '100%',
      borderRadius: '8px',
      transition: 'transform 0.3s ease-in-out'
    },
    title: {
      marginTop: '10px',
      fontSize: '16px'
    },
    paragraph: {
      margin: '10px 0',
      fontSize: '14px'
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '8px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    buttonHover: {
      backgroundColor: '#0056b3'
    },
    heartIcon: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      cursor: 'pointer',
      width: '24px',
      height: '24px',
      fill: '#ccc'
    },
    heartIconActive: {
      fill: 'red'
    }
  };

  return (
    <div style={styles.container}>
      {courses.map((course) => (
        <div
          key={course.id}
          style={styles.card}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = styles.cardHover.transform;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'none';
          }}
        >
          <svg
            onClick={() => toggleFavorite(course.id)}
            style={{
              ...styles.heartIcon,
              ...(favorites[course.id] ? styles.heartIconActive : {})
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <img
            src={c1}
            alt={course.title}
            style={styles.image}
          />
          <h3 style={styles.title}>{course.title}</h3>
          <p style={styles.paragraph}>{course.description}</p>
          <p style={styles.paragraph}>{course.price}</p>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => addToCart(course)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default WishList;

