import React, { useCallback, useState } from "react";
import Slider from "react-slick";
import "./TestimonialsCommunity.css";
import { TestimonialsData } from "./TestimonialsData";
import { TecButton } from "../elements/elements";
import { FaUsers } from "react-icons/fa";
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { toast } from "react-toastify";

const colorMap = {};
const TestimonialsCommunity = () => {

  const [imageLoadFailed, setImageLoadFailed] = useState({});
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const totalStars = 5;

    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <span key={index} className="testimonial-star testimonial-full-star">★</span>
        ))}
        {halfStar && <span className="testimonial-star testimonial-half-star">★</span>}
        {Array.from({ length: totalStars - fullStars - (halfStar ? 1 : 0) }).map(
          (_, index) => (
            <span key={index + fullStars + 1} className="testimonial-star  testimonial-empty-star">☆</span>
          )
        )}
      </>
    );
  };

  const handleImageError = (id) => {
    setImageLoadFailed((prevState) => ({ ...prevState, [id]: true }));
  }

  const getInstructorInitials = (name) => {
    const initials = name.split(" ").map(n => n[0]).join("");
    return initials.toUpperCase();
  };

  const getRandomColor = useCallback(() => {
    const colors = ['#FFB6C1', '#FFD700', '#00FA9A', '#1E90FF', '#FF6347'];
    return colors[Math.floor(Math.random() * colors.length)];
  }, [])

  const getColorForItem = (itemId) => {
    if (!colorMap[itemId]) {
      colorMap[itemId] = getRandomColor();
    }
    return colorMap[itemId];
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const handleJoinCommunity = async (e) => {
    e.preventDefault()
   

    if (!email) {
      setError('Please Enter Email.');
      return;
    }
    if (!consent) {
      
      setError('Agree to receive updates.');
      return;
    }
    const regex = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,253}\.[a-zA-Z]{2,}$/g
    let isValid = regex.test(email)

    if (!isValid) {
      setError('Please Enter Valid Email.');
      return;
    }

    setLoading(true)
    setError('');

    try {
      const response = await CallAPI(endpoints?.joinCommunity, { email: email, consent: consent })
      if (response.status?.code === 200) {
        setEmail('')
        
      toast.success(response?.status?.message || 'You have successfully joined the community!');
    } else {
      toast.error('Something went wrong. Please try again.');
    }
    } catch (error) {
      console.log('[TestimonialsCommunity...handleJoinCommunity]',error.message)
      toast.error('Something went wrong. Please try again.')
    } finally{
      setLoading(false)
    }




  }
  return (
    <div className="testimonials-community">


      <div className="testimonials-section">
        <h2>What Our Students Say</h2>
        <div className="vector-container">
          <img src="https://i.ibb.co/sJX0NL8/Vector-13.png" alt="Vector-13" className="vector-image" />
        </div>
        <Slider {...sliderSettings} className="testimonials-slider">
          {TestimonialsData && TestimonialsData.length > 0 && TestimonialsData.map((item, index) => (
            <div key={index} className="testimonial-item">
              <div className="testmonial-img-card">
                {item.ImageURl && !imageLoadFailed[item.id] ? (
                  <img
                    src={item.ImageURl}
                    alt={item.name}
                    className="instructor-image"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <div
                    className="instructor-avatar"
                    style={{ backgroundColor: getColorForItem(item.id) }}
                  >
                    {getInstructorInitials(item.name)}
                  </div>
                )}
                <div className="testimonial-name">{item.name}</div>
              </div>
              <span className="userRating">{renderStars(item.stars)}</span>
              <p className="testmonial-para">{item.Testimony}</p>

            </div>
          ))}
        </Slider>
      </div>

      {/* Join Our Community Section */}
      <div className="join-community-component">
        <div className="join-community-section">
          <h2>Join Our Thriving Community</h2>
          <p className="join-description">Get exclusive updates on courses, events, and offers.</p>
          <form className="join-community-form" onSubmit={handleJoinCommunity}>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="email-input"
              aria-label="Enter your email"
              required
            />



            <TecButton
              title="Join Now"
              styling={{
                background: "var(--tec-link)",
                color: "var(--tec-light)",
                fontWeight: 600,
                padding: "12px 24px",
                borderRadius: "30px",
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                border: "none",
                transition: "background 0.3s ease, transform 0.3s ease",
              }}
              type='submit'
              loading={loading}
              icon={<FaUsers size={20} style={{ marginRight: "8px" }} />}

            />
          </form>
          <div className="checkbox-container">
            <input type="checkbox" id="updates-offers" onChange={(e) => setConsent(e.target.checked)} />
            <label htmlFor="updates-offers" className="updates-offers">
              Yes, I want to receive updates and offers
            </label>
          </div>
          {error && <div className="error_message" >{error}</div>}
        </div>

      </div>

    </div>
  );
};

export default TestimonialsCommunity;
