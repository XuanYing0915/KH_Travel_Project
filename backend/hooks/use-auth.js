import { createContext, useContext, useState } from 'react'

// 建立一個Context
const AuthContext = createContext(null)

// 建立提供者元件(Provider)
// 要讓`/pages/_app.js`導入包裹使用，可讓所有的頁面及元件共享狀態
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ id: 0, name: '', token: '' })

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

// 建立讓後代元件(消費者consumer)使用的勾子
export const useAuth = () => useContext(AuthContext)