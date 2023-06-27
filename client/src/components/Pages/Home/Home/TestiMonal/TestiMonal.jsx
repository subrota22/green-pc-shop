import React from "react";

export default function Testimonials() {
    return (
        <div className="py-16 bg-gray-900 my-5 text-center  mx-auto">
            <div className="container mx-auto px-4  lg:items-center justify-between ">
                <div className="text-center ml-80">
                    <h1 className="text-2xl leading-tight md:text-4xl xl:text-5xl font-semibold md:leading-10   text-white xl:w-2/3 pr-16 lg:pr-0">Our customers love what we do</h1>
                    <p className="mt-4 text-base leading-normal text-white md:w-2/3 lg:w-3/4 pr-16 lg:pr-0">We invite you to experience the excellence and satisfaction that our products offer. <br /> Explore our collection today and join the ranks of our delighted customers!</p>
                    <button className="hidden md:block w-full sm:w-auto mt-12 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 lg:flex items-start justify-center sm:justify-start px-8 py-4 bg-indigo-700 hover:bg-gray-600 rounded text-base font-medium leading-none text-center text-white my-4">Read success stories</button>
                </div>
                <div role="list" aria-label="Testimonials" className="xl:w-1/2 grid sm:grid-cols-1 md:grid-cols-2 mx-auto lg:grid-cols-1 gap-6 flex-wrap justify-center items-start">
                    <div role="listitem" className="bg-white shadow rounded p-4 xl:p-8">
                        <img src="https://cdn.tuk.dev/assets/components/26May-update/quote.png" alt="testimonal" aria-hidden="true" />
                        <div className="pl-4 pt-4 flex items-start justify-between">
                            <div className="mr-6">
                                <p className="xl:text-xl xl:leading-loose text-gray-600">I've tried several similar products in the past, but none compare to the Monitor from All green computer. The design is sleek and modern, and the functionality is top-notch. It has become an indispensable tool for me</p>
                                <p className="mt-4 text-base font-semibold leading-none text-gray-800">Anna Smith</p>
                            </div>
                            <img src="https://cdn.tuk.dev/assets/components/26May-update/avatar-1.png" alt="Display Avatar of Anna Smith" />
                        </div>
                    </div>
                    <div role="listitem" className="bg-white shadow rounded p-4 xl:p-8">
                        <img src="https://cdn.tuk.dev/assets/components/26May-update/quote.png" alt="testimonal" aria-hidden="true" />
                        <div className="pl-4 pt-4 flex items-start justify-between">
                            <div className="mr-6">
                                <p className="xl:text-xl xl:leading-loose text-gray-600">At All green computer, customer satisfaction is our priority. We are thrilled to receive such positive feedback from our valued customers, and it serves as a testament to our commitment to delivering high-quality resellable products.</p>
                                <p className="mt-4 text-base font-semibold leading-none text-gray-800">Dany John</p>
                            </div>
                            <img src="https://cdn.tuk.dev/assets/components/26May-update/avatar-2.png" alt="Display avatar of Dany John" />
                        </div>
                    </div>
                    <div role="listitem" className="bg-white shadow rounded p-4 xl:p-8">
                        <img src="https://cdn.tuk.dev/assets/components/26May-update/quote.png" alt="testimonal" aria-hidden="true" />
                        <div className="pl-4 pt-4 flex items-start justify-between">
                            <div className="mr-6">
                                <p className="xl:text-xl xl:leading-loose text-gray-600">The resellable products offered by all green computer are simply outstanding. From the moment I received my order, I could tell that great care had been taken in packaging and presentation. The product itself is fantastic and has become a game-changer for me</p>
                                <p className="mt-4 text-base font-semibold leading-none text-gray-800">Mike Blake</p>
                            </div>
                            <img src="https://cdn.tuk.dev/assets/components/26May-update/avatar-3.png" alt="Display Avatar of Mike Blake" />
                        </div>
                    </div>
                    <button className="md:hidden w-full sm:w-auto mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 flex items-start justify-center sm:justify-start px-8 py-4 bg-indigo-700 hover:bg-gray-600 rounded text-base font-medium leading-none text-center text-white">Read success stories</button>
                </div>
            </div>
        </div>

    );
}
