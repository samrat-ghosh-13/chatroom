context("Message Board Web App Store Testing", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  describe("Store Testing", () => {
    it("renders and checks the store from the window", () => {
      cy.window()
        .its("store")
        .invoke("getState")
        .should("deep.equal", {
          message: {
            users: {
              "samratat@gmail.com": {
                id: 1,
                name: "Samrat Ghosh",
                password: "1234567890",
                email: "samratat@gmail.com",
              },
              "roshnidas@gmail.com": {
                id: 2,
                name: "Roshni Das",
                password: "1234567809",
                email: "roshnidas@gmail.com",
              },
              "test@gmail.com": {
                name: "Test",
                password: "1234567890",
                email: "test@gmail.com",
                id: 3,
              },
              "test1@gmail.com": {
                name: "test1",
                password: "1234567890",
                email: "test1@gmail.com",
                id: 4,
              },
              "lol@gmail.com": {
                name: "lol",
                password: "1234567890",
                email: "lol@gmail.com",
                id: 5,
              },
              "lol1@gmail.com": {
                name: "lol1",
                password: "1234567890",
                email: "lol1@gmail.com",
                id: 6,
              },
            },
            messages: {
              1: {
                id: 1,
                message: "This is a test message of thread 1.",
                author: "samratat@gmail.com",
                replies: [
                  {
                    id: 0,
                    author: "samratat@gmail.com",
                    message: "Lol, I love this.dfsdf",
                  },
                  {
                    id: 678,
                    author: "samratat@gmail.com",
                    message: "hgfhfghsdfsdfsdf",
                  },
                ],
              },
              2: {
                id: 2,
                message:
                  "This is a test message of thread 2. message of thread 2. This is a test message of thread 2.",
                author: "roshnidas@gmail.com",
                replies: [
                  {
                    id: 322,
                    message: "123123",
                    author: "samratat@gmail.com",
                  },
                  {
                    id: 292,
                    message: "LOl",
                    author: "roshnidas@gmail.com",
                  },
                ],
              },
              3: {
                author: "samratat@gmail.com",
                message: "Tesdt",
                replies: [],
                id: 3,
              },
              4: {
                author: "samratat@gmail.com",
                message: "Useless",
                replies: [],
                id: 4,
              },
              5: {
                id: 5,
                message: "LOL",
                author: "test@gmail.com",
                replies: [
                  {
                    id: 504,
                    message: "Lol",
                    author: "samratat@gmail.com",
                  },
                ],
              },
              6: {
                author: "samratat@gmail.com",
                message: "lol",
                replies: [],
                id: 6,
              },
            },
            signedinUser: {
              author: "",
            },
            loading: false,
            signin: false,
          },
        });
    });
  });
});
