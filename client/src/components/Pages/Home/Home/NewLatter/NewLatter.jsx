
export default function Newsletter() {

    return (
        <div>
            <div className="mx-4 md:mx-12 py-8 md:py-12 grid place-content-center my-5 px-4 md:px-0">
                <div className="lg:flex justify-start lg:gap-28">
                    <div className>
                        <h1 className="font-bold text-5xl text-white">Newsletter</h1>
                        <p className="pt-8 md:pt-4 text-white">Sign up for our newsletter and get weekly updates. We only send emails about our latest products on the market once a week every Friday.</p>
                       <form action="https://formsubmit.co/itinfobd24@gmail.com" method="post">
                       <div className="mt-8 md:flex justify-start md:gap-4">
                            <input type="email" placeholder="Your Email" name="email" className="text-blue-400 w-full md:w-1/2 p-4 grid place-items-center border rounded-md focus:outline-none" required/>
                            <button className="w-full md:w-auto bg-indigo-600 text-white px-8 py-4 border rounded-md hover:bg-indigo-700 grid place-items-center font-semibold mt-4 md:mt-0 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Subscribe</button>
                        </div> 
                        
                        </form>
                        <p className="pt-4 text-xs text-white">Read our <u className="cursor-pointer no-underline hover:underline">privacy policy</u></p>
                    </div>
                    <div className="pt-8 lg:pt-0">
                        <img src="https://i.ibb.co/4SzjWXT/pexels-andrea-piacquadio-3777566-1.png" alt="man in black suit holding brown paper" className="hidden lg:block" />
                        <img src="https://i.ibb.co/W2q6bWQ/pexels-andrea-piacquadio-3777566-1-1.png" alt="man in black suit holding brown paper" className="hidden sm:block lg:hidden" />
                        <img src="https://i.ibb.co/PMg7LjM/pexels-andrea-piacquadio-3777566-1sm.png" alt="man in black suit holding brown paper" className="sm:hidden" />
                    </div>
                </div>
            </div>
        </div>




    );
}


