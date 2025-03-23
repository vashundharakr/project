import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import testimonial1 from "../assets/img/testimonial-1.jpg";
import testimonial2 from "../assets/img/testimonial-2.jpg";
import testimonial3 from "../assets/img/testimonial-3.jpg";

const testimonials = [
  {
    id: 1,
    image: testimonial1,
    name: "John Doe",
    profession: "Software Engineer",
    feedback:
      "Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet.",
  },
  {
    id: 2,
    image: testimonial2,
    name: "Sarah Smith",
    profession: "Marketing Manager",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut nisl sit amet elit euismod faucibus.",
  },
  {
    id: 3,
    image: testimonial3,
    name: "Michael Brown",
    profession: "Business Analyst",
    feedback:
      "Dolor sit amet consectetur adipiscing elit. Ut elit tellus luctus nec ullamcorper mattis pulvinar dapibus leo.",
  },
];

const TestimonialSection = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
          <h1 className="mb-3">Our Clients Say!</h1>
          <p>
            Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero
            ipsum sit eirmod sit.
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonial-item bg-light rounded p-3 m-4">
                <div className="bg-white border rounded p-4">
                  <p>{testimonial.feedback}</p>
                  <div className="d-flex align-items-center">
                    <img
                      className="img-fluid flex-shrink-0 rounded"
                      src={testimonial.image}
                      alt={testimonial.name}
                      style={{ width: "45px", height: "45px" }}
                    />
                    <div className="ps-3">
                      <h6 className="fw-bold mb-1">{testimonial.name}</h6>
                      <small>{testimonial.profession}</small>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialSection;
