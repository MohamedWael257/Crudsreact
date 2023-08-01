import React, { useEffect, useRef, useState } from "react";
import "./App.css"
import { useDispatch, useSelector } from "react-redux";
import { additem, clearcruds, deleteitem, filter, filterBySearch, items, seacrhbycategory, updateitem } from "./redux/slice/Crudslice";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [id, setId] = useState(0)
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [taxes, setTaxes] = useState("")
  const [ads, setAds] = useState("")
  const [discount, setDiscount] = useState("")
  const [total, setTotal] = useState("")
  const [count, setCount] = useState("")
  const [category, setCategory] = useState("")

  const [search, setSearch] = useState("")
  const [searchvl, setSearchvl] = useState("search")

  const [isedit, setIsedit] = useState(false)
  const cruds = useSelector(items)
  const filteritems = useSelector(filter)
  const currentitems = filteritems.length > 0 ? filteritems : cruds
  const searchref = useRef()
  const dispatch = useDispatch()
  useEffect(() => {
    setTotal((+price) + (+taxes) + (+ads) - (+discount))
  }, [price, discount, ads, taxes])
  useEffect(() => {
    dispatch(filterBySearch({ product: cruds, search: search }))
  }, [dispatch, search, cruds])
  return (
    <>
      <ToastContainer />
      <div className="crud">
        <h1>Crud</h1>
        <img src="https://mohammed78787.github.io/CRUDS/night-mode-1.png" onClick={() => { document.documentElement.classList.toggle("darktheme") }} />
        <h3>PRODUCT MANAGEMENT SYSTEM</h3>
        <div className="form">
          <div className="title">
            <input type="text" value={title} placeholder="title" required onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="total">
            <input type="text" value={price} placeholder="price" required onChange={(e) => setPrice(e.target.value)} />
            <input type="text" value={taxes} placeholder="taxes" required onChange={(e) => setTaxes(e.target.value)} />
            <input type="text" value={ads} placeholder="ads" required onChange={(e) => setAds(e.target.value)} />
            <input type="text" value={discount} placeholder="discount" required onChange={(e) => setDiscount(e.target.value)} />
            <label>Total: {total}</label>
          </div>
          <div className="count">
            <input type="text" value={count} placeholder="count" required onChange={(e) => setCount(e.target.value)} />
          </div>
          <div className="category">
            <input type="text" value={category} placeholder="category" required onChange={(e) => setCategory(e.target.value)} />
            {!isedit ?
              <button onClick={() => {
                dispatch(additem({ title, price, taxes, ads, discount, total, count, category }))
                setTitle("")
                setPrice("")
                setTaxes("")
                setAds("")
                setDiscount("")
                setCount("")
                setCategory("")
              }}>Create</button>
              : <button onClick={() => {
                setIsedit(false)
                dispatch(updateitem({ id, title, price, taxes, ads, discount, total, count, category }))
                setTitle("")
                setPrice("")
                setTaxes("")
                setAds("")
                setDiscount("")
                setCount("")
                setCategory("")
              }}>Update</button>
            }

          </div>
          <div className="search">
            <input type="text" ref={searchref} placeholder={searchvl} value={search} required onChange={(e) => setSearch(e.target.value)} disabled />
            <div>
              <button onClick={() => {
                searchref.current.disabled = false
                searchref.current.focus()
                setSearchvl("Search By Title")
                setSearch("")
              }}>Search By Title</button>
              <button onClick={() => {
                searchref.current.disabled = false
                searchref.current.focus()
                setSearchvl("Search By Category")
                setSearch("")
              }}>Search By Category</button>
            </div>
            {currentitems.length > 0 && <button onClick={() => { dispatch(clearcruds()) }}>Delete all</button>}
          </div>
        </div>
        <div className="table">
          {
            currentitems.length > 0 &&
            <>
              {currentitems.map((item, index) => {
                return (
                  <div className="output" key={item.id}>
                    <div>id : {index}</div>
                    <div>title : {item.title}</div>
                    <div>price : {item.price}</div>
                    <div>taxes : {item.taxes}</div>
                    <div>ads : {item.ads}</div>
                    <div>discount : {item.discount}</div>
                    <div>total : {item.total}</div>
                    <div> category :{item.category}</div>
                    <div><button onClick={() => {
                      setIsedit(true)
                      setId(index)
                      setTitle(item.title)
                      setPrice(item.price)
                      setTaxes(item.taxes)
                      setAds(item.ads)
                      setDiscount(item.discount)
                      setTotal(item.total)
                      setCount(item.count)
                      setCategory(item.category)
                    }
                    }>Update</button></div>
                    <div><button onClick={() => {
                      dispatch(deleteitem(index))
                      console.log(index);
                    }}>Delete</button></div>
                  </div>
                )
              })}
            </>
          }
        </div>
      </div>
    </>
  );
}

export default App;