// import { routerRedux } from 'dva/router';

export default {
  namespace:'lists',
  state: [],
  effects: {
    *addRemote({payload: todo }, {put, call}) {
      // yield call(addTodo, todo);
      yield put({type:'add', payload: todo})
    }
  },
  reducers: {
    add(state, { payload: todo}) {
      console.log(state, todo, "========>");
      
      return state.concat(todo);
    },
    remove(state, { payload: id}) {
      console.log(id, "ddddddd")
      return state.filter(todo => todo.id !== id);
    },
    update(state, { payload: updatedTodo}) {
      return state.map(todo => {
        if (todo.id === updatedTodo.id) {
          return { ...todo, ...updatedTodo};
        } 
        return todo;
      });
    }
  }
}