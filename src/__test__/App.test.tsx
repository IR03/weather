import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import App from "../App";
import { createMemoryHistory } from "history";

describe('test rect router', () => {

    test('find the text', () => {
        render(<App />)
        const app = screen.getByTestId('app');
        expect(app).toBeInTheDocument();
    });


    test('redirects to search page', ()=> {
        const history = createMemoryHistory({initialEntries : ["/"]});
        render (
            <Router history={history}>
                <App/>
            </Router>
        );
        expect(history.location.pathname).toBe('/')
    })



    // test('landing on a bad page',  () => {

    //     const history = createMemoryHistory({initialEntries : ["/invalid"]});
    //     render(
    //         <Router history={history}>
    //             <App />
    //         </Router>
    //     );
        
    //     expect(screen.getByText('404')).toBeInTheDocument();

    // })

})