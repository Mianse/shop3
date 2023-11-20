import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import useCategory from '../components/hooks/useCategory'


const Categories = () => {
    const categories = useCategory()
  return (
    <Layout to={"All Categories"}>
        <div className="container">
            <div className="row">
                {categories.map((c)=>(
                     <div className="col-md-6 mt-3 mb-3" key={c._id}>
                    <Link to={`/category/${c.slug}`} className='btn btn-primary'>{c.name}</Link>
                 </div>
                ))}
               
            </div>
        </div>

    </Layout>
  )
}

export default Categories
