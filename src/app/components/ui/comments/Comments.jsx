import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../../common/comments";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments, getCommentsLoadingStatus, loadCommentsList, removeComment } from "../../../store/comments";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(getComments());
  const isLoading = useSelector(getCommentsLoadingStatus());

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: userId }));
  };

  const handleRemoveComment = (id) => {
    dispatch(removeComment(id));
  };
  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading
              ? <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
              : "Loading..."
            }
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
