// import { render, screen, fireEvent, cleanup, waitFor, mockResponse} from "@testing-library/react";
import { render, screen, fireEvent, cleanup, waitFor} from "@testing-library/react";
// import userEvent from '@testing-library/user-event';
import Dashboard from "./Dashboard";
import "./people.js";

describe("this is a dashboard screen", () => {
    afterEach(cleanup);

    // it("has a display for email and token", async () => {
    //     render(<Dashboard/>);

        
    //     const account = screen.getByTestId("account");
    //     expect(account).toBeInTheDocument();
    // });

    it("has a button for logout", () => {
        render(<Dashboard/>);

        const logout_btn = screen.getByTestId("send-logout");
        expect(logout_btn).toBeInTheDocument();
    });

    it("has a table for user dashboard", () => {
        render(<Dashboard/>);

        const user_dashboard = screen.getByTestId("user-dashboard");
        expect(user_dashboard).toBeInTheDocument();
    });
});

describe("this checks the details of the dashboard", ()=>{
    afterEach(cleanup);

    it("checks total users in dashboard", async () => {
        
        // await waitFor(async () => 
        //     expect(await screen.findByText('Leanne Graham')).toBeInTheDocument()
        // );
        // expect(screen.getByTestId('dash_name')).toHaveTextContent('Leanne Graham')
        
        expect(await screen.getAllByTestId('dash_list').length).toBe(10);
    
    });

});