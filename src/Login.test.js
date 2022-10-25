import { render, screen, fireEvent, cleanup, waitFor, mockResponse} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "./App";
import "./people.js";

describe("this is a user dashboard app", ()=> {
    afterEach(cleanup)

    it("has an input field for email", () => {
        render(<App/>);

        const email = screen.getByTestId("email");
        expect(email).toBeInTheDocument();
    });

    it("has an input field for password", () => {
        render(<App/>);

        const password = screen.getByTestId("password");
        expect(password).toBeInTheDocument();
    })

    it("has a button to submit credentials", () => {
        render(<App/>);

        const btn = screen.getByTestId("send-user-login");
        expect(btn).toBeInTheDocument();
    })
});

test('submits username and password', async () => {

    // ARRANGE
    const username = "eve.holt@reqres.in";
    const password = "cityslicka";
    const mockLogin = jest.fn();

    render(<App onSubmit={mockLogin(username, password)} />);

    const usernameInput = screen.getByTestId('email');
    userEvent.type(usernameInput, 'eve.holt@reqres.in');
    const passwordInput = screen.getByTestId('password');
    userEvent.type(passwordInput, 'cityslicka');
    const loginButton = screen.getByTestId('send-user-login');
    expect(loginButton).not.toBeDisabled();

    // ACT
    userEvent.click(loginButton);

    // ASSERT
    await expect(mockLogin).toHaveBeenCalled();
    await expect(mockLogin).toHaveBeenCalledTimes(1);
    await expect(mockLogin).toHaveBeenCalledWith("eve.holt@reqres.in", "cityslicka");

  });
  






/*describe("Checks the UI has an exit button", () => {
    afterEach(cleanup)

    

    it("has a button to exit", () => {
          beforeEach(() => {
            jest.spyOn(global, 'fetch').mockResolvedValue({
              json: jest.fn().mockResolvedValue(mockResponse)
            })
          });
          
          afterEach(() => {
            jest.restoreAllMocks();
          });

        const submit = jest.fn();
          render(<App submit = {submit}/>)
        
            //email
            const email = screen.getByTestId("email");
            userEvent.type(email,"eve.holt@reqres.in");
        
            //password
            const password = screen.getByTestId("password");
            userEvent.type(password, "cityslicka");
        
            //button
            const btn = screen.getByTestId("send-user-login");
            userEvent.click(btn);

            // const btn1 = screen.getByTestId("send-logout");
            // expect(btn1).toBeInTheDocument();
        //eslint-disable-next-line testing-library/prefer-screen-queries
        //expect(screen.getByTestId("send-logout")).toBeInTheDocument();

        expect(submit).toHaveBeenCalledWith({
                    email:"eve.holt@reqres.in",
                    password:"cityslicka"
                });



    })

});*/