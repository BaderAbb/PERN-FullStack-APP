import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'
import postService from '../services/postService'

const PostContext = createContext()

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const createPost = async postData => {
    try {
      setLoading(true)
      const newPost = await postService.createPost(postData)
      setPosts([newPost, ...posts])
      return newPost
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getFeed = useCallback(async () => {
    try {
      setLoading(true)
      const feed = await postService.getFeed()
      setPosts(feed)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, []) // Array vacío: la función nunca cambia

  useEffect(() => {
    getFeed()
  }, [getFeed]) // Ahora es seguro ponerla aquí

  const getMyPosts = useCallback(async () => {
    try {
      setLoading(true)
      const myPosts = await postService.getMyPosts()
      setPosts(myPosts)
      return myPosts
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <PostContext.Provider value={{ posts, loading, createPost, getMyPosts }}>
      {children}
    </PostContext.Provider>
  )
}

export { PostContext }
