const INIT_STATE = {
  productUploadModal: {
    active: false
  },
  profile: {
    projects: []
  },
  currentProjectTab: 0,
  currentTablePage: 0,
  projectListIsLoading: false,
  currentProject: false,
  currentStrain: false,
  showProjectList: false,
  showNewProjectModal: false,
  showStrainDataModal: false,
  strainData: {
    isLoading: true,
    cleanData: {},
    smartTableHeaders: []
  }
}

const userReducer = (state=INIT_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_UPLOAD_MODAL': {
      const active = !state.productUploadModal.active
      return Object.assign({}, state, { productUploadModal: { active } })
    }
    case 'STOP_LOADING':{
      return Object.assign({}, state, { projectListIsLoading: false })
    }
    case 'START_LOADING':{
      return Object.assign({}, state, { projectListIsLoading: true })
    }
    case 'ON_CHANGE':{
      const { id, value } = action.event.target
      return Object.assign({}, state, { credentials:{ [id]:value }})
    }
    case 'GET_PROFILE':{
      const { profile, ratings, customs, results } = action
      const { projects } = profile
      console.log(results)
      const update = projects.map((prj, pidx) => {
        const c = customs.filter(cus => cus.project === prj._id)
        prj.customs = [].concat(c) || []
        const r = ratings.filter(rtg => rtg.Project === prj._id)
        prj.ratings = [].concat(r) || []
        const s = results ? results.filter(rst => rst.project === prj._id) : [{data:[{}]}]
        prj.results = s[0] ? s[0].data[0] : {}// Only a single result per project is supported right now
        return prj
      })
      console.log(profile)
      return Object.assign({}, state, { profile: { projects: update }, projectListIsLoading: false })
    }
    case 'SET_CURRENTPROJECTTAB':{
      const { currentIndex, previousIndex } = action
      return Object.assign({}, state, { currentProjectTab: currentIndex, previousProjectTab: previousIndex })
    }
    case 'SET_CURRENTTABLEPAGE':{
      const { page } = action
      return Object.assign({}, state, { currentTablePage: page })
    }
    case 'SET_CURRENTSTRAIN':{
      const { id } = action
      return Object.assign({}, state, { currentStrain: id })
    }
    case 'TOGGLE_PROJECTLIST':{
      const { showProjectList } = state
      return Object.assign({}, state, { showProjectList: !showProjectList })
    }
    case 'SHOW_PROJECTLIST':{
      return Object.assign({}, state, { showProjectList: true })
    }
    case 'HIDE_PROJECTLIST':{
      return Object.assign({}, state, { showProjectList: false })
    }
    case 'TOGGLE_NEWPROJECTMODAL': {
      const { showNewProjectModal } = state
      return Object.assign({}, state, { showNewProjectModal: !showNewProjectModal })
    }
    case 'CLOSE_NEWPROJECTMODAL': {
      return Object.assign({}, state, { showNewProjectModal: false })
    }
    case 'TOGGLE_STRAINDATAMODAL': {
      const { showStrainDataModal } = state
      return Object.assign({}, state, { showStrainDataModal: !showStrainDataModal })
    }
    case 'CLOSE_STRAINDATAMODAL': {
      return Object.assign({}, state, { showStrainDataModal: false })
    }
    case 'OPEN_PROJECT': {
      const { projectId } = action
      return Object.assign({}, state, { currentProject: projectId })
    }
    case 'CREATE_NEWPROJECT': {
      return Object.assign({}, state, { projectListIsLoading: true })
    }
    case 'UPDATE_PROJECTLIST': {
      const { projectList } = action
      return Object.assign({}, state, { profile: { projects: projectList }, projectListIsLoading: false })
    }
    case 'GET_ALLSTRAINS': {
      const { strainData } = action
      return Object.assign({}, state, { strainData })
    }
    case 'ADD_IDTOPROJECT': {
      const { profile, id } = action
      const { projects } = profile
      const pidx = projects.findIndex(item => item._id === id)
      projects[pidx].likedIds.push(id)
      return Object.assign({}, state, { profile: { projects: updatedProjects }, ...state })
    }
    case 'GET_RATINGS': {
      const { ratings, profile } = action
      const { projects } = profile

      const rpids = ratings.map(rtg => rtg.Project)

      const updatedProjects = projects.map(prj => {
        const ridx = rpids.findIndex(rpid => rpid === prj._id)
        prj.ratings = ratings[ridx]
        return prj
      })

      return Object.assign({}, state, { profile: { projects: updatedProjects }})
    }
    case 'SET_RATING': {
      const { id, val, profile, proj } = action
      const { projects, _id } = profile
      const pidx = projects.findIndex(item => item._id === proj)
      
      const ratings = projects[pidx].ratings  
      const ridx = ratings.findIndex((rating) => rating.Strain === id )
      if(ridx >= 0){
        projects[pidx].ratings[ridx].Rating = val
      }else{
        projects[pidx].ratings.push({ Rating:val, Strain:id, Project:proj, User:_id })
      }

      const likedIds = projects[pidx].likedIds
      projects[pidx].likedIds = val>3 ? likedIds.concat(id) : likedIds.filter(bi => id !== bi)
      
      return Object.assign({}, state, { profile: { projects: projects }})
    }
    case 'SET_CUSTOMS': {
      const { message, customs } = action
      const { projects } = state.profile
      projects.forEach((prj, pidx) => {
        customs.forEach(cus => {
          if(prj.customs.length < 1) return projects[pidx].customs.push(cus)
          prj.customs.forEach((pcu, uidx) => {
            if(cus.project === pcu.project){
              projects[pidx].customs[uidx] = cus
            }else{
              projects[pidx].customs.push(cus)
            }
          })
        })
      })
      return Object.assign({}, state, { profile: { projects: projects } })
    }
    case 'REMOVE_IDFROMPROJECT': {
      const { id } = action
      const { profile, pid } = state
      const pidx = profile.projects.findIndex(item => item._id === pid)
      const projects = profile.projects
      projects[pidx].likedIds = projects[pidx].likedIds.filter(val => val !== id)
      return Object.assign({}, state, { profile: { projects }})
    }
    case 'SUBMIT_PROJECT': {
      return Object.assign({}, state, { currentProjectTab: 2 })
    }
    case 'RECEIVE_PROJECTRESULTS': {
      const { data } = action
      const { profile, currentProject } = state
      const pidx = profile.projects.findIndex(item => item._id === currentProject)
      const projects = profile.projects
      projects[pidx].results = data
      return Object.assign({}, state, { profile: { projects }})
    }
    default:
      return state
  }
}

export default userReducer