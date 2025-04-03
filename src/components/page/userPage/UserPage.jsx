import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import UserCard from "../../ui/userCard/UserCard";
import QualitiesCard from "../../ui/qualitiesCard/QualitiesCard";
import MeetingsCard from "../../ui/meetingsCard/MeetingsCard";
import Comments from "../../ui/comments/Comments";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    API.users.getById(userId).then(data => setUser(data));
  }, []);

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
