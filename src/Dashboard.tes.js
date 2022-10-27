// im
import { render, screen, fireEvent, cleanup, waitFor} from "@testing-library/react";

import Dashboard from "./Dashboard";
import Login from './Login';
import "./people.js";

describe("this is a dashboard screen", () => {
    afterEach(cleanup);

    // it("has a display for email and token", async () => {
    //     render(<Dashboard/>);

        
    //     const account = screen.getByTestId("account");
    //     expect(account).toBeInTheDocument();
    // });

    it("has a button for logout", () => {
       
        render(<Login/>);

        
            //email
            const email = screen.getByTestId("email");
            userEvent.type(email,"eve.holt@reqres.in");
        
            //password
            const password = screen.getByTestId("password");
            userEvent.type(password, "cityslicka");
        
            //button
            const btn = screen.getByTestId("send-user-login");
            userEvent.click(btn);

            const btn1 = screen.getByTestId("send-logout");
            expect(btn1).toBeInTheDocument();

        const logout_btn = screen.getByTestId("send-logout");
        expect(logout_btn).toBeInTheDocument();
    });

    it("has a table for user dashboard", () => {
        render(<Login/>);

        const user_dashboard = screen.getByTestId("user-dashboard");
        expect(user_dashboard).toBeInTheDocument();
    });
});

/*describe("this checks the details of the dashboard", ()=>{
    afterEach(cleanup);

    it("checks total users in dashboard", async () => {
        render(<Dashboard/>);
        // await waitFor(async () => 
        //     expect(await screen.findByText('Leanne Graham')).toBeInTheDocument()
        // );
        // expect(screen.getByTestId('dash_name')).toHaveTextContent('Leanne Graham')
        
        expect(await screen.getAllByTestId('dash_list').length).toBe(10);
    
    });

});*/