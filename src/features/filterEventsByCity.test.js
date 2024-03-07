import { loadFeature, defineFeature } from "jest-cucumber"; //load Gerkin file, define code for file
import { render, screen, within, waitFor, getByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import { extractLocations, getEvents } from "../api";

const feature = loadFeature('./src/features/filterEventsByCity.feature'); // expects path start at root

//run empty test to recieve formatted set of testing steps
defineFeature(feature, test => {     
    test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('user hasn’t searched for any city', () => {

        });

        when('the user opens the app', () => { //where main action of test is specified
            render(<App/>);
        });

        then('the user should see the list of all upcoming events.', async() => {
            const EventListDOM = screen.getByTestId('event-list');

            await waitFor(() => {
              const EventListItems = within(EventListDOM).queryAllByRole('listitem');
              expect(EventListItems.length).toBe(32);
        });
    });
});


    test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
        given('the main page is open', () => {
            render(<App/>)
        });

        when('user starts typing in the city textbox', () => {

        });

        then('the user should recieve a list of cities (suggestions) that match what they’ve typed', async() => {
            const user = userEvent.setup();
            const citySearchInput = screen.getByTestId('city-search-input');
            await user.type(citySearchInput, "Berlin")

            const suggestionListItems= screen.getAllByRole("listitem");
            expect(suggestionListItems).toHaveLength(34);
        });
    });

    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
        given('user was typing “Berlin” in the city textbox', async() => {
            render(<App/>);
            const user = userEvent.setup();
            const citySearchInput = screen.getByTestId('city-search-input');
            await user.type(citySearchInput, "Berlin")
        });

        and('the list of suggested cities is showing', () => {
            const suggestionListItems= screen.getAllByRole("listitem");
            expect(suggestionListItems).toHaveLength(34);
        });

        when('the user selects a city (e.g., “Berlin, Germany”) from the list', async() => {
            const user = userEvent.setup();
            const suggestionListItems= screen.getAllByRole("listitem");
            await user.click(suggestionListItems[0]);
        });

        then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
            const citySearchInput = screen.getByTestId('city-search-input');
            expect(citySearchInput.value).toBe('Berlin, Germany')
        });

        and('the user should receive a list of upcoming events in that city', async() => {
            const allEvents = await getEvents();
            const allLocations = extractLocations(allEvents);

            const CitySearchInput= screen.getByTestId('city-search-input');

            await waitFor(()=>{
                const berlinEvents = allEvents.filter(event => event.location === CitySearchInput.value)
                const suggestionListItems=screen.getAllByRole("listitem")
                expect (suggestionListItems).toHaveLength(berlinEvents.length)
            })

        });
    });          
});