

const ON_CHANGE = 'ON_CHANGE'
const GET_PROFILE = 'GET_PROFILE'
const SET_CURRENTPROJECTTAB = 'SET_CURRENTPROJECTTAB'
const SET_CURRENTTABLEPAGE = 'SET_CURRENTTABLEPAGE'
const OPEN_PROJECT = 'OPEN_PROJECT'
const TOGGLE_PROJECTLIST = 'TOGGLE_PROJECTLIST'
const TOGGLE_STRAINDATAMODAL = 'TOGGLE_STRAINDATAMODAL'
const CLOSE_STRAINDATAMODAL = 'CLOSE_STRAINDATAMODAL'
const SET_CURRENTSTRAIN = 'SET_CURRENTSTRAIN'
const SHOW_PROJECTLIST = 'SHOW_PROJECTLIST'
const HIDE_PROJECTLIST = 'HIDE_PROJECTLIST'
const CREATE_NEWPROJECT = 'CREATE_NEWPROJECT'
const TOGGLE_NEWPROJECTMODAL = 'TOGGLE_NEWPROJECTMODAL'
const CLOSE_NEWPROJECTMODAL = 'CLOSE_NEWPROJECTMODAL'
const SUBMIT_PROJECT = 'SUBMIT_PROJECT'
const RECEIVE_PROJECTRESULTS = 'RECEIVE_PROJECTRESULTS'
const GET_ALLSTRAINS = 'GET_ALLSTRAINS'
const GET_STRAINNAMEBYID = 'GET_STRAINNAMEBYID'
const GET_RATINGS = 'GET_RATINGS'
const SET_RATING = 'SET_RATING'
const GET_CUSTOMS = 'GET_RATINGS'
const SET_CUSTOMS = 'SET_CUSTOMS'
const ADD_IDTOPROJECT = 'ADD_IDTOPROJECT'
const REMOVE_IDFROMPROJECT = 'REMOVE_IDFROMPROJECT'
const UPDATE_PROJECTLIST = 'UPDATE_PROJECTLIST'

const userActionCreator = {
  onChange: (e) => {
    return (dispatch, getState) => {
      dispatch({ type: ON_CHANGE, event: e })
    }
  },
  getProfile: () => {
    return (dispatch, getState) => {
      const { cookies } = getState().login
      const JWToken = cookies ? cookies.get('jwt') : null
      fetch('/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': JWToken,
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(data => {
          const { profile, ratings, customs, results } = data
          console.log(results)
          dispatch({ type: GET_PROFILE, profile, ratings, customs, results })
        })
    }
  },
  toggleProductUploadModal: () => {
    return (dispatch, getState) => {
      dispatch({ type: 'TOGGLE_PRODUCT_UPLOAD_MODAL' })
    }
  }
}
export default userActionCreator