const KEY = 'VUEX_STATE'

export default function(store){
  // 保存仓库到本地
  window.addEventListener('beforeunload', ()=>{
    localStorage.setItem(KEY, JSON.stringify(store.state))
  })

  // 恢复仓库数据
  try {
    const localState = localStorage.getItem(KEY)
    if(localState){
      store.replaceState(JSON.parse(localState))
    }
  } catch (error) {
    console.log('本地存储数据异常');
  }
}