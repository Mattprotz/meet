import userEvent from "@testing-library/user-event";
import Event from "../components/Event";
import { render, screen, waitFor } from "@testing-library/react";

describe('<Event/> componenent', ()=>{
    test('description section hidden by default', async()=>{
        render(<Event/>);
        const eventDescription= screen.queryByTestId('event-description');
        expect(eventDescription).not.toBeInTheDocument();
        
    })
    // test('show details when user clicks "show details" button', async()=>{
    //     render(<Event/>);

    //     const user = userEvent.setup();

    //     const showDetailsButton = screen.getByText("Show Details")
    //     await user.click(showDetailsButton);

    //     console.log(screen.debug());

    //     await waitFor(() => {
    //         const eventDescription = screen.queryByTestId('event-description');
    //         expect(eventDescription).toBeInTheDocument();
    //     });
    // })
    // test('hides details when user clicks "hide details" button', async()=>{

    // })
});