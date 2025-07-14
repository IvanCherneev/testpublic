import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard/UserCard";
import QualitiesCard from "../../ui/qualitiesCard/QualitiesCard";
import MeetingsCard from "../../ui/meetingsCard/MeetingsCard";
import Comments from "../../ui/comments/Comments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
  const user = useSelector(getUserById(userId));

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard data={user.qualities} />
            <MeetingsCard value={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <Comments />
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;
