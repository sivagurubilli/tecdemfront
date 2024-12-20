import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import img2 from '../../img/img2.jpg';

const CourseCard = ({ course, onAddToCart }) => {
    const cardStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
    };

    const imageStyle = {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: '20px',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
    };

    return (
        <div style={cardStyle}>
            <img src={img2} alt={course.title} style={imageStyle} />
            <div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{course.title}</h3>
                <p style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>{course.description}</p>
                <button style={buttonStyle} onClick={() => onAddToCart(course.id)}>Add to Cart</button>
            </div>
        </div>
    );
};

CourseCard.propTypes = {
    course: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
    onAddToCart: PropTypes.func.isRequired,
};

const WishlistCart = () => {
    const [isWishlistOpen, setWishlistOpen] = useState(false);
    const courses = [
        {
            id: 1,
            title: 'React for Beginners',
            description: 'Learn the basics of React.js',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            title: 'Advanced React',
            description: 'Dive deeper into React.js',
            image: 'https://via.placeholder.com/150'
        },
       
    ];

    const toggleWishlist = () => {
        setWishlistOpen(!isWishlistOpen);
    };

    const navigate = useNavigate();

    const handleAddToCart = (courseId) => {
        console.log(`Added course ${courseId} to cart`);
        
    };

    const handleViewFullWishlist = () => {
        navigate('/bucketlist');
        setWishlistOpen(false); 
    };

    const dropdownStyle = {
        position: 'absolute',
        top: '60px',
        right: '50px',
        width: '320px',
        maxHeight: '400px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
    };

    const buttonStyle = {
        width: '100%',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '12px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
    };

    return (
        <div className="app" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <button onClick={toggleWishlist} style={{ marginBottom: '20px' }}>Toggle Wishlist</button>
            {isWishlistOpen && (
                <div style={dropdownStyle}>
                    <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>Wishlist</h2>
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} onAddToCart={handleAddToCart} />
                    ))}
                    <button style={buttonStyle} onClick={handleViewFullWishlist}>
                        View Full Wishlist
                    </button>
                </div>
            )}
        </div>
    );
};

export default WishlistCart;
