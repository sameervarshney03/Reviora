// Imports from libraries
import { useContext} from "react";
import {Link} from "react-router-dom";

// Internal imports
import userContext from "../context/userContext";
import FeatureSection from "./FeatureSection";

// Image imports
import heroImg from "url:../../public/images/hero.png";
import note1 from "url:../../public/images/note1.png";
import note2 from "url:../../public/images/note2.png";
import note3 from "url:../../public/images/note3.png";

const HeroComponent = () => {

    const user = useContext(userContext);

    if(!user){
        return null;
    }

    const {isUserLoggedIn} = user;

    return (
        <div>
            {/*Hero section as the landing section*/}
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                    src={heroImg}
                    alt="Reviora Hero"
                    className="max-w-sm rounded-lg shadow-2xl w-full"
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
                                <Link to="/notes" className="btn btn-accent mr-2">Notes</Link>
                                <Link to="/revision" className="btn btn-accent ml-2">Revision</Link>
                            </> 
                        ):
                        (
                            <>
                                <Link to= "/signup" className="btn btn-accent mr-2">SignUp</Link>
                                <Link to= "/login" className="btn btn-accent ml-2">Login</Link>
                            </>
                        )
                    }
                    </div>
                </div>
            </div>

            {/*Feature Section Heading*/}
            <div className="bg-base-100 py-12">
                <h2 className="text-4xl font-bold text-center">
                    See Reviora In Action
                </h2>
            </div>
            
            <FeatureSection src = {{note1, note2, note3}} alt = {{notealt1: "note1", notealt2: "note2", notealt3: "note3"}} title = "Notes" description = "The is the description of the notes component" reverse = {false}/>
            
            <FeatureSection src = {{note1, note2, note3}} alt = {{notealt1: "note1", notealt2: "note2", notealt3: "note3"}} title = "Revision" description = "The is the description of the revision component" reverse = {true}/>
            
            {/*Heading to tell the working of hero section*/}
            <div className="bg-base-100 py-12">
                <h2 className="text-4xl font-bold text-center">
                    How Reviora Works
                </h2>
            </div>
            
            {/*How to use section*/}
            <div className="flex justify-center bg-base-200 p-16">
                <ul className="steps steps-vertical">
                    <li className="step step-primary">Create Notes</li>
                    <li className="step step-primary">Reviora Tracks Learning</li>
                    <li className="step">Spaced Repetition </li>
                    <li className="step">Long-Term Retention</li>
                </ul>
            </div>

           {/* Footer Section */}
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