import React from "react";
import {
    StackedCarousel,
    ResponsiveContainer,
} from "react-stacked-center-carousel";
import car1 from "../assets/car1.webp"
import car2 from "../assets/car2.webp"
import car3 from "../assets/car3.webp"


export const data = [{
        cover: "https://cdn.bugece.co/f780559a-7329-4309-8961-8f0a96970999",
        title: "Inception",
    },
    {
        cover: "https://cdn.bugece.co/553b34c9-0202-4660-9060-f1512704ac6a",
        title: "Blade Runner 2049",
    },
    {
        cover: "https://cdn.bugece.co/e79923ae-099d-47ec-91f1-2fa05f9886f3",
        title: "Icon man 3",
    },
    {
        cover: "https://cdn.bugece.co/f780559a-7329-4309-8961-8f0a96970999",
        title: "Inception",
    },
    {
        cover: "https://cdn.bugece.co/553b34c9-0202-4660-9060-f1512704ac6a",
        title: "Blade Runner 2049",
    },
    {
        cover: "https://cdn.bugece.co/e79923ae-099d-47ec-91f1-2fa05f9886f3",
        title: "Icon man 3",
    },
    {
        cover: "https://cdn.bugece.co/f780559a-7329-4309-8961-8f0a96970999",
        title: "Inception",
    },
    {
        cover: "https://cdn.bugece.co/553b34c9-0202-4660-9060-f1512704ac6a",
        title: "Blade Runner 2049",
    },
    {
        cover: "https://cdn.bugece.co/e79923ae-099d-47ec-91f1-2fa05f9886f3",
        title: "Icon man 3",
    },

];


export default function ResponsiveCarousel(props) {
    const ref = React.useRef();
    return ( <
        div style = {
            { width: "100%", position: "relative" }
        } >
        <
        ResponsiveContainer carouselRef = { ref }
        render = {
            (parentWidth, carouselRef) => {
                // If you want to use a ref to call the method of StackedCarousel, you cannot set the ref directly on the carousel component
                // This is because ResponsiveContainer will not render the carousel before its parent's width is determined
                // parentWidth is determined after your parent component mounts. Thus if you set the ref directly it will not work since the carousel is not rendered
                // Thus you need to pass your ref object to the ResponsiveContainer as the carouselRef prop and in your render function you will receive this ref object
                let currentVisibleSlide = 5;
                if (parentWidth <= 1440) currentVisibleSlide = 3;
                if (parentWidth <= 1080) currentVisibleSlide = 1;
                return ( <
                    StackedCarousel ref = { carouselRef }
                    slideComponent = { Card }
                    slideWidth = { parentWidth < 800 ? parentWidth - 40 : 750 }
                    carouselWidth = { parentWidth }
                    data = { data }
                    currentVisibleSlide = { currentVisibleSlide }
                    maxVisibleSlide = { 5 }
                    useGrabCursor /
                    >
                );
            }
        }
        /> < >
        <
        /> < /
        div >
    );
}

// Very import to memoize your Slide component otherwise there might be performance issue
// At minimum your should do a simple React.memo(SlideComponent)
// If you want the absolute best performance then pass in a custom comparator function like below
export const Card = React.memo(function(props) {
    const { data, dataIndex } = props;
    const { cover } = data[dataIndex];
    return ( <
        div style = {
            {
                width: "100%",
                height: 300,
                userSelect: "none",
            }
        }
        className = 'my-slide-component' >
        <
        img style = {
            {
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: 0,
            }
        }
        className = "border border-solid border-neonBlue"
        draggable = { false }
        src = { cover }
        /> < /
        div >
    );
});

// import React, { useEffect, useState } from "react";
// import partyex from "../assets/partyex.webp";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import car1 from "../assets/car1.webp"
// import car2 from "../assets/car2.webp"
// import car3 from "../assets/car3.webp"
// import {
//   IoIosArrowBack,
//   IoIosArrowForward,
//   IoIosCalendar,
//   IoIosClock,
//   IoIosPin,
// } from "react-icons/io";
// import { useNavigate } from "react-router";
// import { Link } from "react-router-dom";
// import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";
// import { db } from "../utils/firebase";
// import { async } from "@firebase/util";
// const EventContainer = () => {
//   const [events, setevents] = useState([]);
// const navigate = useNavigate()
//   const Party = "Party1";

//   const responsive = {
//     superLargeDesktop: {
//       // the naming can be any, depends on you.
//       breakpoint: { max: 4000, min: 3000 },
//       items: 1,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 1,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 1,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//     },
//   };

//   return (
//     <div className=''>
//       <Carousel
//         infinite={true}
//         responsive={responsive}
//         removeArrowOnDeviceType={["mobile"]}
//         centerMode={true}
//         customLeftArrow={
//           <IoIosArrowBack className='absolute top-0 left-0 cursor-pointer text-6xl text-neonBlue bg-black h-full bg-opacity-90' />
//         }
//         customRightArrow={
//           <IoIosArrowForward className='absolute top-0 right-0 cursor-pointer  text-6xl text-neonBlue bg-black h-full bg-opacity-90' />
//         }
//         className='cursor-pointer'
//         swipeable={true}
//         draggable={true}
//       >
//        <div><img className="w-[620px]" src={car1} alt="" /></div>
//        <div><img className="w-[620px]" src={car2} alt="" /></div>
//        <div><img className="w-[620px]" src={car3} alt="" /></div>
//       </Carousel>
//     </div>
//   );
// };

// export default EventContainer;