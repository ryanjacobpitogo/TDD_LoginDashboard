// im
import { render, screen, fireEvent, cleanup, waitFor, queryAllByLabelText} from "@testing-library/react";

import Dashboard from "./Dashboard";
import Login from './Login';
import "./people.js";

describe("this is a dashboard screen", () => {
    afterEach(cleanup);

     it("has a display for email and token", async () => {
        <LoginCall/>
         render(<Dashboard/>);

        
        const account = screen.getByTestId("Token");
        expect(account).toBeInTheDocument();
        await waitFor(()=>{
            expect(screen.findByText("QpwL5tke4Pnpja7X4")).toBeTruthy();
        })
    });

    it("has a button for logout", () => {
       
        <LoginCall/>
          render(<Dashboard/>);

          const btn1 = screen.getByTestId("send-logout");
          expect(btn1).toBeInTheDocument();
    });

    it("has a table for user dashboard", () => {
        <LoginCall/>
         render(<Dashboard/>);

        const user_dashboard = screen.getByTestId("user-dashboard");
        expect(user_dashboard).toBeInTheDocument();
    });
});

describe("this checks the details of the dashboard", ()=>{
    afterEach(cleanup);



    it("Test Dynamic List", async () => {
        <LoginCall/>
        render(<Dashboard/>);
          await waitFor(async () => 
             expect(await screen.findByText('Leanne Graham')).toBeInTheDocument());
         expect(screen.getByRole('table')).toHaveTextContent('Leanne Graham');   
    });

});




describe("Testing results after fetch...", ()=>{
	
	afterEach(cleanup);

	it("Check if a certain user exists...", async () => {   
        <LoginCall/>
		render(<Dashboard/>);	
	    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
	});

	it("Check initial no of users in list...", async () => {  
        <LoginCall/>
	        render(<Dashboard/>);
	// eslint-disable-next-line testing-library/no-await-sync-query
                const items = await screen.getByTestId('total-users');
                
                expect(items).toHaveTextContent("Total Users: 0");
	 });

	it("Check total no of users in list...", async () => {  
        <LoginCall/>
		render(<Dashboard/>);
		// li tag/element has a role of listitem
		// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listitem_role

		// using getAllByRole()
		const items = await screen.findAllByRole('list');
		expect(items.length).toEqual(10);

		// using getAllByTestId()
		const users = await screen.findAllByRole('list');
		expect(users.length).toEqual(10);
	});
});

const LoginCall =()=> {
    render(<Login/>);
    //email
    const email = screen.getByTestId("email");
    fireEvent.change(email, {target: {value : "eve.holt@reqres.in"}});

    //password
    const password = screen.getByTestId("password");
    fireEvent.change(password, {target: {value : "cityslicka"}});
    render( <Dashboard/>);

}