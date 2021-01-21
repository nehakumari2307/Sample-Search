const initialState = { result: [], status: null };
import { INIT_ROLE_LIST, SEARCH_ROLE_LIST } from 'Redux/ActionTypes';
import { AllowedEntityStatusColor } from 'Types/Domain';
import RoleSearchHelper from './RoleSearchHelper';

export default (state = initialState, action) => {
  switch (action.type) {
    //Load page with inital load
    case INIT_ROLE_LIST:
      return { ...state, ...action.payload };
    //Search elastic document by name and description
    case SEARCH_ROLE_LIST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

//Redux-Thunk
export const RolesByNameDesc = (term: string, delItems: boolean = false) => {
  const itemStatus = [
    {
      bool: {
        should: [
          {
            match: {
              'entityState.itemID': AllowedEntityStatusColor.published
            }
          }
        ]
      }
    }
  ];

  delItems &&
    itemStatus[0].bool.should.push({
      match: {
        'entityState.itemID': AllowedEntityStatusColor.deleted
      }
    });
  //term.replace(/[+-\\&\|\!\(\)\{\}\[\]\^"~*?:\\]/g, '\\$&');
  return async (dispatch, state) =>
    new RoleSearchHelper(
      {
        bool: {
          should: [
            {
              query_string: {
                query:
                  '*' +
                  term
                    .replace(/[-]/g, ' ')
                    .toLowerCase()
                    .trim() +
                  '*',
                fields: ['name'],
                analyze_wildcard: false,
                minimum_should_match: '100%',
                analyzer: 'keyword',
                default_operator: 'AND',
                boost: 1
              }
            },
            {
              bool: {
                must: {
                  match: {
                    description: {
                      query: '*' + term.toLowerCase() + '*',
                      operator: 'and'
                    }
                  }
                }
              }
            }
          ],
          minimum_should_match: 1,
          must: itemStatus
        }
      },
      SEARCH_ROLE_LIST
    ).execute(dispatch, state);
};

export const RoleListInit = async (dispatch, state) => {
  new RoleSearchHelper(
    {
      bool: {
        must: {
          match: { 'entityState.itemID': AllowedEntityStatusColor.published }
        }
      }
    },
    INIT_ROLE_LIST
  ).execute(dispatch, state);
};
