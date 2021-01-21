import axios from 'axios';
import { SearchStatus } from 'Common/Constants';

export default class ReoleSearchHelper {
  private query: Object;
  private action: string;

  constructor(query: Object, action: string) {
    this.query = query;
    this.action = action;
  }

  private processResponse = (data: Array<any>) => {
    return data.map(value => {
      const entity = value._source;
      return {
        description: entity.description,
        itemID: entity.entityState.itemID,
        allowedMemberTypes: entity.allowedMemberTypes,
        name: entity.name,
        entityState: entity.entityState
      };
    });
  };

  public execute = async (dispatch, state) => {
    axios
      .post(process.env.ELASTIC_SEARCH_BASE + '/searchRoles', {
        query: this.query
      })
      .then(response => {
        dispatch({
          type: this.action,
          payload: {
            result: this.processResponse(response.data.hits.hits as Array<any>),
            status: SearchStatus.SUCCESS,
            message: 'success'
          }
        });
      })
      .catch(error => {
        console.log('ERROR');
        const message: string =
          !error.response || error.response.status === 404
            ? 'Error handling the request'
            : 'An error is encountered, Please try again';
        dispatch({
          type: this.action,
          payload: {
            result: null,
            status: SearchStatus.ERROR,
            message
          }
        });
      });
  };
}
