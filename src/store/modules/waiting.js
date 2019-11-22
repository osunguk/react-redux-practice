import { createAction, handleActions } from 'redux-actions';

const CHANGE_INPUT = 'waiting/CHANGE_INPUT'
const CREATE = 'waiting/CREATE'
const ENTER = 'waiting/ENTER'
const LEAVE = 'waiting/LEAVE'

// export const changeInput = text => ({ type: CHANGE_INPUT, payload: text})
// export const create = text => ({ type: CREATE, payload: text})
// export const enter = id => ({ type: ENTER, payload: id})
// export const leave = id => ({ type: LEAVE, payload: id})


let id = 3; //데이터를 새로 생성 할 때마다 고유 id 값을 주기 위해서
// 아래는 craeteAction으로 만드는 액션함수정의 코드
export const changeInput = createAction(CHANGE_INPUT, text => text)
export const create = createAction(CREATE, text => ({text, id: id++}))
export const enter = createAction(ENTER, id => id)
export const leave = createAction(LEAVE, id => id)

const initialState = {
  input: '',
  list: [
    {
      id: 0,
      name: '홍길동',
      entered: true,
    },
    {
      id: 1,
      name: '콩쥐',
      entered: false,
    },
    {
      id: 2,
      name: '팥쥐',
      entered: false,
    },
  ],
};

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload
    }),
    [CREATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: action.payload.id,
        name: action.payload.text,
        entered: false,
      })
    }),
    [ENTER]: (state, action) => ({
      ...state,
      list: state.list.map(
        item =>
          item.id === action.payload
            ? {...state, entered: !item.entered}
            : item
      ),
      [LEAVE]: (state, action) => ({
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
      })
    })
  },
  initialState
)