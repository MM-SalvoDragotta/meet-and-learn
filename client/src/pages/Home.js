import React from 'react';
import { useQuery } from '@apollo/client';

import Card from '../components/Card'

import MeetingList from '../components/MeetingList';


import { QUERY_MEETINGS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_MEETINGS);
  const meetings = data?.meetings || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-8 mb-3 p-3"
          style={
            { 
              border: '1px dotted #1a1a1a',
              fontSize: "1.2rem ",
              fontWeight: "900"
            }
          }
        >
         Upcoming Events
          </div>
          <div className="col-12 col-md-8 mb-3">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <MeetingList
                meetings={meetings}                
              />
            )}
          </div>               
        </div>      
    </main>
  );
};

export default Home;
