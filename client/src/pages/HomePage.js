import Layout from "../components/Layout.jsx"
import {useAuth} from "../context/auth.js"
const HomePage = () => {
  const [auth ,setAuth] = useAuth()

  return (
    <Layout title={"Best deals"}>
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth,null,4)}</pre>
  
    </Layout>
  )
}

export default HomePage
