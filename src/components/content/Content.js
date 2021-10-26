// react
import React, { useState, useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// redux actions and selectors
import {
  fetchMessagesAsync,
  addMessagesAsync,
  editMessagesAsync,
  deleteMessagesAsync,
  addThreadAsync,
  editThreadAsync,
  deleteThreadAsync,
  fetchUsersAsync,
  getMessages,
  getSigninState,
  getSigninUserState,
  getLoadingState,
} from "../../features/messages/messageSlice.js";

// components
import ButtonComponent from "../button/Button";
import LoaderComponent from "../loader/Loader";
import ModalComponent from "../modal/Modal";
import ReactTooltip from "react-tooltip";

// styles with styled components
import styled from "styled-components";

// utils
import { debounce } from "../../utils/utils";

const Content = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  margin-top: 80px;
  padding: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 40px;
`;

const MessageBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 48px);
  max-width: 1240px;
  overflow-x: scroll;
`;

const MessageBoards = styled.div`
  border-radius: 4px;
  background-color: rgb(247, 247, 247);
  border-radius: 4px;
  border: 0.5px solid rgb(219, 219, 219);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: 24px;
`;

const MessageBoardPostedBy = styled.p`
  margin: 0;
  color: rgb(120, 124, 126);
`;

const MessageBoardContent = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
`;

const MessageBoardButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MessageBoardButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 16px;
  font-size: 14px;
  :disabled {
    cursor: not-allowed;
  }
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const ModalContentsButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const MessageBoardReplies = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px dotted #cdcdcd;
  margin-top: 16px;
  padding: 16px;
`;

const MessageBoardRepliesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 16px;
`;

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1240px;
  margin: auto;
`;

function ContentComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textAreaContent, setTextAreaContent] = useState("");
  const [currentItem, setCurrentItem] = useState({});
  const [currentReply, setCurrentReply] = useState({});
  const [type, setType] = useState("");
  const messages = useSelector(getMessages);
  const isLoading = useSelector(getLoadingState);
  const signedIn = useSelector(getSigninState);
  const signedInUser = useSelector(getSigninUserState);

  // instantiating dispatch
  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(fetchMessagesAsync());
    await dispatch(fetchUsersAsync());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMessageBoardClick = (item) => {
    setType("reply");
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleEditReplyClick = (item, element) => {
    setType("edit-reply");
    setCurrentItem(item);
    setCurrentReply(element);
    setTextAreaContent(element.message);
    setIsModalOpen(true);
  };

  const handleDeleteReplyClick = async (item, element) => {
    await dispatch(deleteMessagesAsync({ item, element }));
    await dispatch(fetchMessagesAsync());
  };

  const handleEditThreadClick = async (item) => {
    setType("edit-thread");
    setCurrentItem(item);
    setTextAreaContent(item.message);
    setIsModalOpen(true);
  };

  const handleDeleteThreadClick = async (item) => {
    await dispatch(deleteThreadAsync({ item }));
    await dispatch(fetchMessagesAsync());
  };

  const showMessageBoards = () => {
    return (
      <MessageBoardContainer className="app__content__message">
        {Object.values(messages).map((item) => {
          return (
            <MessageBoards
              className="app__content__message__boards"
              key={item.id}
            >
              <MessageBoardPostedBy className="app__content__message__boards__postedby">
                <span>posted by {item.author}</span>
              </MessageBoardPostedBy>
              <MessageBoardContent className="app__content__message__boards__content">
                <span>{item.message}</span>
              </MessageBoardContent>
              <MessageBoardButtonContainer className="app__content__message__boards__buttons-c">
                {item.replies.length === 0 ? (
                  <MessageBoardButton
                    className="app__content__message__boards__buttons-c__reply-button"
                    data-tip={
                      !signedIn && signedInUser.author.length === 0
                        ? "Please sign in to Reply"
                        : ""
                    }
                    disabled={!signedIn && signedInUser.author.length === 0}
                    onClick={() => handleMessageBoardClick(item)}
                  >
                    Reply
                  </MessageBoardButton>
                ) : (
                  <span className="app__content__message__boards__buttons-c__comments">{item.replies.length} Comments</span>
                )}
                <MessageBoardButton
                  data-tip={
                    !signedIn && signedInUser.author.length === 0
                      ? "Please sign in to Edit threads"
                      : signedIn && signedInUser?.author !== item.author
                      ? "Only the Author can Edit threads"
                      : ""
                  }
                  disabled={
                    (!signedIn && signedInUser.author.length === 0) ||
                    (signedIn && signedInUser?.author !== item.author)
                  }
                  className="app__content__message__boards__buttons-c__edit-button"
                  onClick={() => handleEditThreadClick(item)}
                >
                  Edit Thread
                </MessageBoardButton>
                <MessageBoardButton
                  data-tip={
                    !signedIn && signedInUser.author.length === 0
                      ? "Please sign in to Delete threads"
                      : signedIn && signedInUser?.author !== item.author
                      ? "Only the Author can Delete threads"
                      : ""
                  }
                  disabled={
                    (!signedIn && signedInUser.author.length === 0) ||
                    (signedIn && signedInUser?.author !== item.author)
                  }
                  className="app__content__message__boards__buttons-c__delete-button"
                  onClick={() => handleDeleteThreadClick(item)}
                >
                  Delete Thread
                </MessageBoardButton>
              </MessageBoardButtonContainer>
              {item.replies.length > 0 ? (
                <MessageBoardReplies>
                  {item.replies.map((element, index) => {
                    return (
                      <MessageBoardRepliesContainer
                        key={`${index}-${element.author}-${element.message}`}
                      >
                        <div>
                          <MessageBoardPostedBy>
                            <span>posted by {element.author}</span>
                          </MessageBoardPostedBy>
                          <MessageBoardContent>
                            <span>{element.message}</span>
                          </MessageBoardContent>
                        </div>
                        <MessageBoardButtonContainer>
                          <MessageBoardButton
                            data-tip={
                              !signedIn && signedInUser.author.length === 0
                                ? "Please sign in to Edit replies"
                                : signedIn &&
                                  signedInUser?.author !== element.author
                                ? "Only the Author can Edit replies"
                                : ""
                            }
                            disabled={
                              (!signedIn && signedInUser.author.length === 0) ||
                              (signedIn &&
                                signedInUser?.author !== element.author)
                            }
                            onClick={() => handleEditReplyClick(item, element)}
                          >
                            Edit
                          </MessageBoardButton>
                          <MessageBoardButton
                            data-tip={
                              !signedIn && signedInUser.author.length === 0
                                ? "Please sign in to Delete replies"
                                : signedIn &&
                                  signedInUser?.author !== element.author
                                ? "Only the Author can Delete threads"
                                : ""
                            }
                            disabled={
                              (!signedIn && signedInUser.author.length === 0) ||
                              (signedIn &&
                                signedInUser?.author !== element.author)
                            }
                            onClick={() =>
                              handleDeleteReplyClick(item, element)
                            }
                          >
                            Delete
                          </MessageBoardButton>
                        </MessageBoardButtonContainer>
                      </MessageBoardRepliesContainer>
                    );
                  })}
                  <MessageBoardButtonContainer>
                    <MessageBoardButton
                      data-tip={
                        !signedIn && signedInUser.author.length === 0
                          ? "Please sign in to Reply"
                          : ""
                      }
                      disabled={!signedIn && signedInUser.author.length === 0}
                      onClick={() => handleMessageBoardClick(item)}
                    >
                      Reply
                    </MessageBoardButton>
                  </MessageBoardButtonContainer>
                </MessageBoardReplies>
              ) : (
                ""
              )}
            </MessageBoards>
          );
        })}
      </MessageBoardContainer>
    );
  };

  const handleModalOutsideClick = (value) => {
    setIsModalOpen(value);
    setTextAreaContent("");
    setCurrentItem({});
    setCurrentReply({});
  };

  const handleTextAreaChange = ({ target: { value } }) => {
    setTextAreaContent(value);
  };

  const debounceRejectedClick = debounce(
    () => handleModalOutsideClick(false),
    500
  );

  const handleSave = async () => {
    if (type === "edit-reply") {
      await dispatch(
        editMessagesAsync({
          item: currentItem,
          element: {
            id: currentReply.id,
            author: currentReply.author,
            message: textAreaContent,
          },
        })
      );
      await dispatch(fetchMessagesAsync());
      setTextAreaContent("");
      setCurrentItem({});
      setCurrentReply({});
      setIsModalOpen(false);
    } else if (type === "reply") {
      await dispatch(
        addMessagesAsync({
          id: currentItem.id,
          value: textAreaContent,
          item: currentItem,
          author: signedInUser?.author,
        })
      );
      await dispatch(fetchMessagesAsync());
      setTextAreaContent("");
      setCurrentItem({});
      setIsModalOpen(false);
    } else if (type === "edit-thread") {
      await dispatch(
        editThreadAsync({
          item: {
            ...currentItem,
            message: textAreaContent,
          },
        })
      );
      await dispatch(fetchMessagesAsync());
      setTextAreaContent("");
      setCurrentItem({});
      setCurrentReply({});
      setIsModalOpen(false);
    } else if (type === "add-thread") {
      await dispatch(
        addThreadAsync({
          message: textAreaContent,
          author: signedInUser?.author,
        })
      );
      await dispatch(fetchMessagesAsync());
      setTextAreaContent("");
      setCurrentItem({});
      setCurrentReply({});
      setIsModalOpen(false);
    }
  };

  const debounceApprovedClick = debounce(() => handleSave(), 500);

  const handleAddThread = () => {
    setType("add-thread");
    setIsModalOpen(true);
  };

  const debounceAddThreadClick = debounce(() => handleAddThread(), 500);

  const showModalComponent = () => {
    return (
      <ModalComponent
        open={isModalOpen}
        handleClick={() => handleModalOutsideClick()}
      >
        <ModalContents>
          <label htmlFor="reply">Comment:</label>
          <textarea
            id="reply"
            name="reply"
            rows="4"
            cols="50"
            value={textAreaContent}
            placeholder="Enter something..."
            onChange={(e) => debounce(handleTextAreaChange(e), 500)}
          ></textarea>
          <ModalContentsButtonContainer>
            <ButtonComponent
              type="cancel"
              label="cancel"
              handleClick={() => debounceRejectedClick()}
            >
              <span>Cancel</span>
            </ButtonComponent>
            <ButtonComponent
              type="check"
              label="check"
              handleClick={() => debounceApprovedClick()}
            >
              <span>Save</span>
            </ButtonComponent>
          </ModalContentsButtonContainer>
        </ModalContents>
      </ModalComponent>
    );
  };

  const showPlaceholder = () => {
    return (
      <Placeholder>
        <h2>There are no message boards, please create one to discuss.</h2>
      </Placeholder>
    );
  };

  return (
    <Content className="app__content">
      {isLoading ? <LoaderComponent className="app__content__loader" /> : ""}
      <ButtonComponent
        type="check"
        label="check"
        handleClick={() => debounceAddThreadClick()}
        disabled={!signedIn && signedInUser?.author}
      >
        <span>Add Thread</span>
      </ButtonComponent>
      {Object.keys(messages).length ? showMessageBoards() : showPlaceholder()}
      {isModalOpen ? showModalComponent() : ""}
      <ReactTooltip />
    </Content>
  );
}

export default ContentComponent;
