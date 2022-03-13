import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  plan:"Page1", environmentHealth:1, yourPopularity:50, turn:1
}

export const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    
    updateSelectedPlan: (state, action) => {
      state.plan = action.payload;
    },
    setEnvironmentHealth: (state, action) => {
      state.environmentHealth = action.payload;
    },
    setYourPopularity: (state, action) => {
      state.yourPopularity = action.payload;
    },
    setTurn: (state) => {
      state.turn++
    },
  },
  
})
function mapStateToProps(state) {
  return {
    env: state.environmentHealth,
    pop: state.yourPopularity,
    turn: state.turn
  }
}
// Action creators are generated for each case reducer function
export const {updateSelectedPlan} = componentSlice.actions

export default componentSlice.reducer
