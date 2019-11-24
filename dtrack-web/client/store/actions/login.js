import { STATUS_CODES } from 'http'

const SET_COOKIEPROVIDER = 'SET_COOKIEPROVIDER'
const SUBMIT_LOGIN = 'SUBMIT_LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const SUBMIT_LOGOUT = 'SUBMIT_LOGOUT'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'LOGOUT_FAIL'
const SUBMIT_SIGNUP = 'SUBMIT_SIGNUP'
const ON_CHANGE = 'ON_CHANGE'
const IS_AUTHED = 'IS_AUTHED'
const STOP_LOADING = 'STOP_LOADING'

const HEADERS = {
  'Content-Type': 'application/json'
}

const STATUS = {
  // This is actually not a good way to go
  OK: [200, 302],
  ok: {
    200: (data, msg) => ({ err:{}, data:data||{}, message:msg||STATUS_CODES[200] }),
    302: (data, msg) => ({ err:{}, data:data||{}, message:msg||STATUS_CODES[302] })
  },
  ERR: [500, 401],
  err: {
    500: (err, data, msg) => ({ err, data:data||{}, message:msg||STATUS_CODES[500] }),
    409: (err, data, msg) => ({ err, data:data||{}, message:msg||STATUS_CODES[409] }),
    401: (err, data, msg) => ({ err, data:data||{}, message:msg||STATUS_CODES[401] })
  },
  DEFAULT: Array.from({1:500}, (x,i) => i).filter(i => !this.OK.concat(this.ERR).includes(i)),
  default: (err, data, msg) => ({ err, data:data||{}, message:msg||STATUS_CODES[418] })
}

const UTIL = {
  // RECV
  isOk: res => STATUS.OK.includes(res.status),
  isErr: res => STATUS.ERR.includes(res.status),
  checkStat: (res, strict=true) => !UTIL.isErr(res) && UTIL.isOk(res) || !strict,
  parseRes: async (res, opts={}) => {
    const OPTS = {
      auth: true,
      // token: true,
      strict: true, 
      message: STATUS.default(),
      ... opts
    }
    const stat = res.status
    const checkStat = UTIL.checkStat(res, OPTS.strict)
    if (checkStat){
      const data = await res.json()
      const { message, isAuthenticated } = data
      if(
        isAuthenticated && OPTS.auth || 
        !isAuthenticated && !OPTS.auth
      ){
        return STATUS.ok[stat](data, message)
      }
      return STATUS.err[stat](null, OPTS.message)
    }
    return STATUS.err[stat](null, OPTS.message)
  },

  //SEND
  token: state => {
    const {cookies} = state.login
    const token = cookies.get('jwt') || String
    return token
  },
  setToken: (state, data, opts) => {
    const token = UTIL.token(state)
    const { cookies } = state.login
    const options = { path: '/', ...opts }
    cookies.set('jwt', token, options)
  }
}

const SEND = {
  auth: async (auth) => {
    const req = fetch('/login/auth', {
      method: 'GET',
      headers: {
        ...HEADERS,
        'Authorization': auth
      }
    })
    return req.then( UTIL.parseRes )
  },
  login: async (un, pw) => {
    const req = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        username: un,
        password: pw
      }),
      headers: HEADERS
    })
    return req.then( parseRes )
  },
  logout: async (auth) => {
    const req = await fetch('/logout', {
      method: 'GET',
      headers: {
        ...HEADERS,
        'Authorization': auth
      }
    })
    return req.then( pareseRes )
  }
}

const RECV = {
  login: (data) => {

  },
  auth: (data) => {
    const { isAuthenticated } = data
  }
}


const loginActionCreator = {
  setCookieProvider: (provider) => {
    return (dispatch) => {
      dispatch({ type: SET_COOKIEPROVIDER, cookies: provider })
    }
  },
  stopLoading: () => {
    return (dispatch) => {
      dispatch({ type: STOP_LOADING } )
    }
  },
  submitLogin : () => {
    return (dispatch, getState) => {
      if(username.value && password.value){
        dispatch({ type: SUBMIT_LOGIN })
        fetch('/login', {
          method: 'POST',
          body: JSON.stringify({
            username: username.value,
            password: password.value
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          return res.status === 401 ?
            { message: 'Invalid username / password.' } :
            res.json()
        })
        .then(data => {
          const { cookies } = getState().login
          const { jwt, isAuthenticated, message } = data
          const isAuthed = isAuthenticated && jwt.success
          if(isAuthed){
            cookies && cookies.set('jwt', jwt.token, { path: '/' })            
            dispatch({
              type: LOGIN_SUCCESS,
              isAuthenticated: isAuthed,
              username: data.username,
              message: message
            })
          }else{
            dispatch({
              type: LOGIN_FAIL,
              message: message
            })
          }
        })
      }        
    }
  },
  submitLogout: () => {
    return (dispatch, getState) => {
      dispatch({ type: SUBMIT_LOGOUT })
      const { cookies } = getState().login
      const JWToken = cookies.get('jwt')
      cookies.remove('jwt')
      fetch('/logout', {
        method: 'GET',
        headers: {
          'Authorization': JWToken
        }
      })
      .then((res) => {
        if(res.status === 401){
          dispatch({type: LOGOUT_FAIL, message: 'Unable to logout'})
        }else{
          dispatch({type: LOGOUT_SUCCESS, message: 'Logout successful.'}) 
        }
      })
    }
  },
  submitSignup: () => {
    return (dispatch, getState) => {
      const { cookies } = getState().login
      cookies &&
        fetch('/signup', {
          method: 'POST',
          body: JSON.stringify({
            email: email.value,
            username: username.value,
            password: password.value
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then( data => {
            const { jwt, isAuthenticated, message } = data
            const isAuthed = isAuthenticated && jwt.success
            if(isAuthed){
              const JWToken = jwt.token
              dispatch({ type: SUBMIT_LOGIN })
              fetch('/login/auth', {
                method: 'POST',
                body:JSON.stringify({
                  username: username.value,
                  password: password.value
                }),
                headers: {
                  'Authorization': JWToken,
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
                .then(data => {
                  const { jwt, isAuthenticated } = data
                  const isAuthed = isAuthenticated && jwt.success
                  if(isAuthed){
                    cookies.set('jwt', jwt.token, { path: '/' })            
                    dispatch({
                      type: LOGIN_SUCCESS,
                      isAuthenticated: isAuthed,
                      username: data.username,
                      message: message
                    })
                  }else{
                    dispatch({
                      type: LOGIN_FAIL,
                      message: message
                    })
                  }
                }) 
            }else{
              dispatch({
                type: LOGIN_FAIL,
                message: message
              })
            }
          })
    }
  },
  checkAuth: () => {
    return (dispatch, getState) => {
      const state = getState()
      const JWToken = UTIL.token(state)
      if(JWToken){
        const authReq = SEND.auth('/login/auth', JWToken)
        return authReq.then(body => {
          const { data, err, message } = body
          const { isAuthenticated } = data
          dispatch({ type: IS_AUTHED, isAuthenticated }) 
        })
      }
      return dispatch({ type: IS_AUTHED, isAuthenticated: false })
    }
  }
}

export default loginActionCreator