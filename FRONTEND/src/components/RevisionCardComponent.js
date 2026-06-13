const RevisionCardComponent = (props) => {

    const {createdAt, material} = props;

    return (
        <div className="w-full min-h-[20vh] py-4 px-8 glass bg-base-200 border-b-2 border-base-content">
            <div className="text-2xl mb-4">
                Date: {createdAt}
            </div>
            <div className="text-2xl">
                {material}
            </div>
        </div>
        
    )
}

export default RevisionCardComponent;