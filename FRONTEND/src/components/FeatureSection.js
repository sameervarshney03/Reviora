// This is the component for te feature section of the hero component

import RevisionCardComponent from "./RevisionCardComponent";

const FeatureSection = (props) => {

    const {src, alt, title, description, reverse} = props;
    const {note1, note2, note3}  = src;
    const {notealt1, notealt2, notealt3} = alt;
    const eId = reverse?'0':'1';

    const revClass = reverse?"hero-content flex-col lg:flex-row-reverse":"hero-content flex-col lg:flex-row";

    return (
        <div className="hero bg-base-200">
                    <div className={revClass}>
                        <div className="carousel w-full max-w-3xl rounded-xl shadow-2xl">
                            <div id={"slide1" + eId} className="carousel-item relative w-full max-w-3xl rounded-xl shadow-2xl">
                                <img
                                src={note1}
                                alt={notealt1}
                                className="w-full max-w-3xl rounded-xl shadow-2xl" />
                                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href={"#slide3"+eId} className="btn btn-circle">❮</a>
                                <a href={"#slide2"+eId} className="btn btn-circle">❯</a>
                                </div>
                            </div>
                            <div id={"slide2" + eId} className="carousel-item relative w-full max-w-3xl rounded-xl shadow-2xl">
                                <img
                                src={note2}
                                alt={notealt2}
                                className="w-full max-w-3xl rounded-xl shadow-2xl" />
                                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href={"#slide1"+eId} className="btn btn-circle">❮</a>
                                <a href={"#slide3"+eId} className="btn btn-circle">❯</a>
                                </div>
                            </div>
                            <div id={"slide3" + eId} className="carousel-item relative w-full max-w-3xl rounded-xl shadow-2xl">
                                <img
                                src={note3}
                                alt={notealt3}
                                className="w-full max-w-3xl rounded-xl shadow-2xl" />
                                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href={"#slide2"+eId} className="btn btn-circle">❮</a>
                                <a href={"#slide1"+eId} className="btn btn-circle">❯</a>
                                </div>
                            </div>
                            </div>
                        <div>
                        <h1 className="text-5xl font-bold">{title}</h1>
                        <p className="py-6">
                            {description}
                        </p>
                        </div>
                    </div>
            </div>
    )
}

export default FeatureSection;