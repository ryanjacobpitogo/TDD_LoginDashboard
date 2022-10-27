import { render, screen, fireEvent, cleanup, waitFor, queryAllByLabelText} from "@testing-library/react";


import Dashboard from './Dashboard';
import Details from './Details';

describe("this is to check for view details button", () =>{
    afterEach(cleanup);

        it("has a button for viewing details", ()=>{
            <LoginCall />  
            render(<Dashboard/>)      

            const btn = screen.getByRole("button");
            expect(btn).toBeInTheDocument();
        })
});

// describe("Checks the UI", ()=>{
//     afterEach(cleanup);

//     it("has a user id", async ()=> {
//         <LoginCall/>
//         render(<Details/>);

//         const id = await screen.getByTestId("userid");
//         expect(id).toHaveTextContent("1");
//     })

//     it("has a user name", async ()=> {
//         <LoginCall/>
//         render(<Details/>);

//         const id = await screen.getByTestId("user-name");
//         expect(id).toHaveTextContent("Leanne Graham");
//     })
// })

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
