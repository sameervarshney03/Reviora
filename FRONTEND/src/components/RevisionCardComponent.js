const RevisionCardComponent = (props) => {

    const {createdAt, material} = props;

    return (
        <div className="w-full min-h-[20vh] py-4 px-8 bg-base-200 border-2 border-base-content mb-4 hover:scale-101">
            <div className="text-2xl mb-4">
                Date: {createdAt.slice(0,10)}
            </div>
            <div className="text-2xl whitespace-pre-line">
                {material}
            </div>
        </div>
        
    )
}

export default RevisionCardComponent;