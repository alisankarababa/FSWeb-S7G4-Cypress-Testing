/*global cy*/



const urlHomePage = "http://localhost:3000/"
const urlSignUp = "http://localhost:3000/signup"

const twoChars = "aa";

describe('Home Page Tests', () => {
    
    it("checks if add member button works properly", () => {
        cy.visit(urlHomePage);
        cy.get('[data-cy="btn-signuppage"]').click();
        cy.url().should("eq", urlSignUp);
    })
})




describe('Form Tests', () => {
    
    beforeEach(() => {
        cy.visit(urlSignUp);
    })

    it("checks if home page button works properly", () => {
        cy.get('[data-cy="btn-homepage"]').click();
        cy.url().should("eq", urlHomePage);
    })

    it("checks if submit button is disabled as it should be", () => {
        cy.get('[data-cy="submit"]').should("be.disabled");
    })
    
    it("checks if submit button is enabled after filling the form with valid data", () => {
        cy.get('[data-cy="input-first-name"]').type("firstname");
        cy.get('[data-cy="input-last-name"]').type("lastname");
        cy.get('[data-cy="input-position"]').select(1);
        cy.get('[data-cy="input-email"]').type("some@email.com");
        cy.get('[data-cy="input-password"]').type("123456");
        cy.get('[data-cy="input-terms"]').check();
        
        cy.get('[data-cy="submit"]').should("be.enabled");
    })

    const user = {
        first_name: "firstname",
        last_name: "lastname",
        position: "Backend Engineer",
        email: "some@email.com",
        password: "123456"
    }

    const user2 = {
        first_name: "firstname2",
        last_name: "lastname2",
        position: "Frontend Engineer",
        email: "some2@email.com",
        password: "qwerqwer"
    }

    function checkIfUserExistsOnMainPage(user) {
        cy.get('[data-cy="first-name"]').should("have.text", user.first_name);
        cy.get('[data-cy="last-name"]').should("have.text", user.last_name);
        cy.get('[data-cy="position"]').should("have.text", user.position);
        cy.get('[data-cy="email"]').should("have.text", user.email); 
    }

    function fillForm(user) {
        cy.get('[data-cy="input-first-name"]').type(user.first_name);
        cy.get('[data-cy="input-last-name"]').type(user.last_name);
        cy.get('[data-cy="input-position"]').select(user.position);
        cy.get('[data-cy="input-email"]').type(user.email);
        cy.get('[data-cy="input-password"]').type(user.password);
        cy.get('[data-cy="input-terms"]').check();
    }

    it("checks if submitted form creates a user", () => {

        fillForm(user);
        
        cy.get('[data-cy="submit"]').click();
        cy.get('[data-cy="btn-homepage"]').click();

        checkIfUserExistsOnMainPage(user);
    })

    it("checks if delete button works", () => {

        fillForm(user);
        
        cy.get('[data-cy="submit"]').click();
        cy.get('[data-cy="btn-homepage"]').click();
        
        cy.get('[data-cy="btn-delete"]').click();

        cy.get('[data-cy="first-name"]').should("not.exist");
        cy.get('[data-cy="last-name"]').should("not.exist");
        cy.get('[data-cy="position"]').should("not.exist");
        cy.get('[data-cy="email"]').should("not.exist");
    })

    // it.only("checks if edit button works", () => {

    //     fillForm(user);
        
    //     cy.get('[data-cy="submit"]').click();
    //     cy.get('[data-cy="btn-homepage"]').click();
        
    //     cy.get('[data-cy="btn-edit"]').click();

    //     cy.get('[data-cy="input-first-name"]').should("have.text", user.first_name);
    //     // cy.get('[data-cy="input-last-name"]').should("have.text", user.last_name);
    //     // cy.get('[data-cy="input-position"]').should("have.text",user.position);
    //     // cy.get('[data-cy="input-email"]').should("have.text", user.email);
    //     // cy.get('[data-cy="input-password"]').should("have.text", user.password);
    //     // cy.get('[data-cy="input-terms"]').should("be.checked");

    //     // fillForm(user2);
    //     // cy.get('[data-cy="submit"]').click();
    //     // cy.get('[data-cy="btn-homepage"]').click();

    //     // checkIfUserExistsOnMainPage(user2);
    // })

    it('checks first name input errors', () => {
        cy.get('[data-cy="input-first-name"]').type(twoChars);
        cy.get('[data-cy="error"]').should("have.length", 1).should("have.text",'Firstname cannot be shorter than 3 characters.');
        cy.get('[data-cy="input-first-name"]').clear();
        cy.get('[data-cy="error"]').should("have.length", 1).should("have.text","Firstname cannot be empty.");
    })

    it('checks last name input errors', () => {
        cy.get('[data-cy="input-last-name"]').type(twoChars);
        cy.get('[data-cy="error"]').should("have.length", 1).should("have.text",'Lastname cannot be shorter than 3 characters.');
        cy.get('[data-cy="input-last-name"]').clear();
        cy.get('[data-cy="error"]').should("have.length", 1).should("have.text","Lastname cannot be empty.");
    })

    it('checks position input errors', () => {
        cy.get('[data-cy="input-position"]').select(1);
        cy.get('[data-cy="input-position"]').select(0);
        cy.get('[data-cy="error"]').should("have.length", 1).should("have.text", "You must a select position.");
    })

    it('checks email input errors', () => {
        cy.get('[data-cy="input-email"]').type(twoChars);
        cy.get('[data-cy="error"]').should("have.length", 1).should("have.text",'Must be a valid email address.');
        cy.get('[data-cy="input-email"]').clear();
        cy.get('[data-cy="error"]').should("have.length", 1).should("have.text","E-mail cannot be empty.");
    })

    it('checks password input errors', () => {
        cy.get('[data-cy="input-password"]').type(twoChars);
        cy.get('[data-cy="error"]').should("have.length", 1).should("have.text",'Passwords must be at least 6 characters long.');
        cy.get('[data-cy="input-password"]').clear();
        cy.get('[data-cy="error"]').should("have.length", 1).should("have.text","Password cannot be empty.");

    })

    it('checks terms input errors', () => {
        cy.get('[data-cy="input-terms"]').check();
        cy.get('[data-cy="input-terms"]').uncheck();
        cy.get('[data-cy="error"]').should("have.length", 1).should("have.text",'You must accept Terms and Conditions.');
    })

})