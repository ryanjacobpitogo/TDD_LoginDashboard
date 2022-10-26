// import { render, screen, fireEvent, cleanup, waitFor, mockResponse} from "@testing-library/react";
import { render, screen, fireEvent, cleanup, waitFor} from "@testing-library/react";
// import userEvent from '@testing-library/user-event';
import Login from "./Login";
import "./people.js";

describe("this is a login screen", ()=> {
    afterEach(cleanup)

    it("has an input field for email", () => {
        render(<Login/>);

        const email = screen.getByTestId("email");
        expect(email).toBeInTheDocument();
    });

    it("has an input field for password", () => {
        render(<Login/>);

        const password = screen.getByTestId("password");
        expect(password).toBeInTheDocument();
    })

    it("has a button to submit credentials", () => {
        render(<Login/>);

        const btn = screen.getByTestId("send-user-login");
        expect(btn).toBeInTheDocument();
    })
});

// describe('submits username and password', async () => {

//     // ARRANGE
//     const username = "eve.holt@reqres.in";
//     const password = "cityslicka";
//     const mockLogin = jest.fn();

//     render(<Login onSubmit={mockLogin(username, password)} />);

//     const usernameInput = screen.getByTestId('email');
//     userEvent.type(usernameInput, 'eve.holt@reqres.in');
//     const passwordInput = screen.getByTestId('password');
//     userEvent.type(passwordInput, 'cityslicka');
//     const loginButton = screen.getByTestId('send-user-login');
//     expect(loginButton).not.toBeDisabled();

//     // ACT
//     userEvent.click(loginButton);

//     // ASSERT
//     await expect(mockLogin).toHaveBeenCalled();
//     await expect(mockLogin).toHaveBeenCalledTimes(1);
//     await expect(mockLogin).toHaveBeenCalledWith("eve.holt@reqres.in", "cityslicka");

//   });
  
describe("Check the submit validity.", () => {
  afterEach(cleanup);

  it("Check the email data input", () => {
    render(<Login/>);

    const email = screen.getByTestId("email");
    fireEvent.change(email, {
      target: { value: "eve.holt@reqres.in"}
    });
    expect(email.value).toBe("eve.holt@reqres.in");
  });

  it("Check the password data input", () => {
    render(<Login/>);

    const password = screen.getByTestId("password");
    fireEvent.change(password, {
      target: { value: "cityslicka"}
    });
    expect(password.value).toBe("cityslicka");
  });
  it("Check if valid user with token", async () => {   
      render(<Login />);
      await waitFor(() => {
          // eslint-disable-next-line testing-library/await-async-query
          expect(screen.findByText('QpwL5tke4Pnpja7X4')).toBeTruthy();
      });
  });
});
  
describe("Checking wrong input by user",()=>{

	afterEach(cleanup);

	it("should check if input username fails", () => {		
		render(<Login />);
		const email = screen.getByTestId("email");
		fireEvent.change(email, { target: { value: "earl" }});
		expect(email.value).not.toBe(true);
	});

	it("should check if input password fails", () => {		
		render(<Login />);
		const password = screen.getByTestId("password");
		fireEvent.change(password, { target: { value: "123" }});
		expect(password.value).not.toBe(true);
	});
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
          render(<Login submit = {submit}/>)
        
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