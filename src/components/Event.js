export default function Event({event}){
    return(
        <li>
            {event.summary}
            <div>{event.description}</div>
        </li>
    )
}

