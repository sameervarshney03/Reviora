// Imports from libraries
import { useContext} from "react";

// Internal imports
import userContext from "../context/userContext";


const HeroComponent = () => {

    
    const {isUserLoggedIn} = useContext(userContext);

    return (
        <div>
            {/* This is from the hero section of daisyUI */}
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                    <h1 className="text-5xl font-bold">Reviora</h1>
                    <p className="py-6">
                        Learning is easy. Remembering is rare. Reviora combines intelligent note-making with a spaced-repetition powered revision system to help transform short-term learning into long-term mastery.
                    </p>

                    {
                        isUserLoggedIn?

                        (
                            <>   
                                <button className="btn btn-accent mr-2">Notes</button>
                                <button className="btn btn-accent ml-2">Revision</button>
                            </> 
                        ):
                        (
                            <>
                                <button className="btn btn-accent mr-2">SignUp</button>
                                <button className="btn btn-accent ml-2">Login</button>
                            </>
                        )
                    }
                    </div>
                </div>
            </div>

            <div className="bg-base-100 py-12">
                <h2 className="text-4xl font-bold text-center">
                    See Reviora In Action
                </h2>
            </div>

            <div className="hero bg-base-200">
                    <div className="hero-content flex-col lg:flex-row">
                        <img
                        src="https://tse3.mm.bing.net/th/id/OIP.BrRuH4bTHNt9xF6Z13hKAwHaDt?rs=1&pid=ImgDetMain&o=7&rm=3"
                        className="w-full max-w-3xl rounded-xl shadow-2xl"
                        />
                        <div>
                        <h1 className="text-5xl font-bold">Box Office News!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        </div>
                    </div>
                </div>

            <div className="hero bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img
                        src="https://tse3.mm.bing.net/th/id/OIP.BrRuH4bTHNt9xF6Z13hKAwHaDt?rs=1&pid=ImgDetMain&o=7&rm=3"
                        className="w-full max-w-3xl rounded-xl shadow-2xl"
                        />
                        <div>
                        <h1 className="text-5xl font-bold">Box Office News!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        </div>
                    </div>
            </div>

            <div className="bg-base-100 py-12">
                <h2 className="text-4xl font-bold text-center">
                    How Reviora Works
                </h2>
            </div>

            <div className="flex justify-center bg-base-200 p-16">
                <ul className="steps steps-vertical">
                    <li className="step step-primary">Create Notes</li>
                    <li className="step step-primary">Reviora Tracks Your Learning</li>
                    <li className="step">Spaced Repetition Schedules Revisions</li>
                    <li className="step">Build Long-Term Retention</li>
                </ul>
            </div>

           
            <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
            <div className="text-xl italic max-w-2xl text-center">
                Knowledge is not built when you learn. It is built when you remember.
            </div>
            <aside>
                <p>Copyright © {new Date().getFullYear()} Reviora - All rights reserved</p>
            </aside>
            </footer>

        </div>
    )
};


export default HeroComponent;