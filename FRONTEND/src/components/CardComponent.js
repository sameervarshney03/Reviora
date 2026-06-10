// This is the component to display the card infomation in the notes page.

const CardComponent = (props) => {

    const {data} = props

    const {title, description, date} = data;

    return (

    <div className="card bg-warning text-warning-content cursor-pointer hover:scale-101  w-96 mb-8">
            <div className="card-body">
            <p>created at: {date.slice(0,10)}</p>
            <h2 className="card-title">{title}</h2>
            <p>{description.slice(0,100)}...</p>
            <div className="card-actions justify-end">
            </div>
        </div>
    </div>
    )
}

export default CardComponent;