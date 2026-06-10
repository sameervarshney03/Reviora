// This is the component for te feature section of the hero component

const FeatureSection = (props) => {

    const {src, alt, title, description, reverse} = props;

    const revClass = reverse?"hero-content flex-col lg:flex-row-reverse":"hero-content flex-col lg:flex-row";

    return (
        <div className="hero bg-base-200">
                    <div className={revClass}>
                        <img
                        src = {src}
                        alt={alt}
                        className="w-full max-w-3xl rounded-xl shadow-2xl"
                        />
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