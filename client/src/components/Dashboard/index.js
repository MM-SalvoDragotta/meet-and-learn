import React from 'react';
import { Link } from 'react-router-dom';
import MeetingList from '../MeetingList'
import { Row } from "react-bootstrap";
import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../../utils/queries';

const QueryMe= () => {
    const { loading, data } = useQuery(QUERY_ME);
    // console.log(data.me.meetings)
    const meetings = data?.me.meetings || [];

  return (
    <div className="col-12 col-md-8 mb-3">
        {loading ? (
        <div>Loading...</div>
        ) : (
        <MeetingList
            meetings={meetings}                
        />
        )}
    </div>
    );
};

export default QueryMe;