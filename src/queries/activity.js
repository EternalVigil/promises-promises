import { gql } from '@apollo/client';

export const GET_ACTIVITY = gql`
    query getActivity {
        activity @rest(type: "Activity", path: "activity") {
            accessibility
            activity
            key
            link
            participants
            price
            type
        }
    } 
`;
