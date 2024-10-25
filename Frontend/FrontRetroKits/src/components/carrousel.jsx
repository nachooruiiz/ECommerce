import React from 'react';
import { Carousel } from 'react-bootstrap';

function Carrousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./../public/C1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./../public/C2.jpg"
          alt="Second slide"
        />
       
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./../public/C3.jpg"
          alt="Third slide"
        />
       
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrousel;
