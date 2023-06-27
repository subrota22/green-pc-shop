import React from "react";

const AboutUs = () => {
    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 my-5 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-white pb-4">About Us</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">

                        At All green computer, we are passionate about delivering exceptional resellable products that enhance your lifestyle. With a focus on quality, innovation, and customer satisfaction, we strive to offer a curated collection of products that are not only functional but also elevate your everyday experiences.

                        Our journey began with a simple idea: to provide customers with access to high-quality products that they can trust. We understand that finding the right product can be a daunting task, with countless options available in the market. That's why we have carefully curated our collection to ensure that every item we offer meets our rigorous standards of excellence.

                        We believe that a great product starts with superior craftsmanship. That's why we partner with reputable manufacturers who share our commitment to quality and attention to detail. Each product in our selection undergoes rigorous testing to ensure its performance, durability, and reliability, so you can shop with confidence.

                        In addition to quality, we prioritize innovation. We stay up-to-date with the latest trends and advancements in the industry to bring you products that are at the forefront of technology. Whether it's a cutting-edge gadget or a smart solution for your daily needs, you can trust us to offer products that are at the forefront of innovation.

                       
                    </p>
                </div>
                <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src="https://i.ibb.co/Lz09RFJ/seller.jpgg" alt="A group of People" />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-white pb-4">Our Story</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">
                        At All green computer, our journey began with a passion for delivering outstanding resellable products that enhance the lives of our customers. From the very beginning, we set out to create a brand that stands for quality, reliability, and customer satisfaction.

                        Our story started with a group of like-minded individuals who shared a common vision: to offer resellable products that surpass expectations. We embarked on a relentless pursuit of excellence, meticulously curating a collection of products that meet our stringent standards.

                        We believe that a great product is more than just a sum of its features. It should resonate with the user on a deeper level, enriching their daily lives and providing value that lasts. That's why we carefully select products that are not only innovative and functional but also thoughtfully designed to enhance the user experience.

                        We pride ourselves on offering resellable products that embody a perfect blend of quality craftsmanship and cutting-edge technology. Each product undergoes rigorous testing to ensure it meets our high standards of performance, durability, and reliability. We only source from trusted manufacturers who share our commitment to excellence.
                    </p>
                </div>
                <div className="w-full lg:w-8/12 lg:pt-8">
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png" alt="Alexa featured Img" />
                            <img className="md:hidden block" src="https://i.ibb.co/zHjXqg4/Rectangle-118.png" alt="Alexa featured Img" />
                            <p className="font-medium text-xl leading-5 text-white mt-4">Alexa</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/fGmxhVy/Rectangle-119.png" alt="Olivia featured Img" />
                            <img className="md:hidden block" src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png" alt="Olivia featured Img" />
                            <p className="font-medium text-xl leading-5 text-white mt-4">Olivia</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png" alt="Liam featued Img" />
                            <img className="md:hidden block" src="https://i.ibb.co/C5MMBcs/Rectangle-120.png" alt="Liam featued Img" />
                            <p className="font-medium text-xl leading-5 text-white mt-4">Liam</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png" alt="Elijah featured img" />
                            <img className="md:hidden block" src="https://i.ibb.co/ThZBWxH/Rectangle-121.png" alt="Elijah featured img" />
                            <p className="font-medium text-xl leading-5 text-white mt-4">Elijah</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
