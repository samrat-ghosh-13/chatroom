// importing the reducer and actions
import messageReducer, {
  signedin,
  signedinUser,
  loadingState,
} from "./messageSlice";

// testing the store using the reducers and the actions
describe("image reducer", () => {
  const initialState = {
    users: {},
    messages: {},
    signedinUser: {
      author: "",
    },
    loading: false,
    signin: false,
  };

  const demoUser = {
    author: "demo_test@gmail.com",
  };

  it("should handle the initial state", () => {
    const actual = messageReducer(initialState, { type: "unknown" });
    expect(actual.users).deep.equal({});
    expect(actual.messages).deep.equal({});
    expect(actual.signedinUser).deep.equal({
      author: "",
    });
    expect(actual.loading).equal(false);
    expect(actual.signin).equal(false);
  });

  it("should handle new loading state changes", () => {
    const actual = messageReducer(initialState, loadingState(true));
    expect(actual.loading).to.eq(true);
  });

  it("should handle new signin state changes", () => {
    const actual = messageReducer(initialState, signedin(true));
    expect(actual.signin).to.eq(true);
  });

  it("should handle new signedinUser state changes", () => {
    const actual = messageReducer(initialState, signedinUser(demoUser));
    expect(actual.signedinUser).to.eq(demoUser);
  });
});
