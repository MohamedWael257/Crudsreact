import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    cruditems: [],
    filteritems: []
}
const crudslice = createSlice({
    name: "crud",
    initialState,
    reducers: {
        additem(state, action) {
            const { title, price, taxes, ads, discount, total, count, category } = action.payload
            const temp = {
                id: state.cruditems.length + 1,
                title: title,
                price: price,
                taxes: taxes,
                ads: ads,
                discount: discount,
                total: total,
                count: count,
                category: category
            }
            if (title != "" && price != "" && count < 10000) {
                if (temp.count > 1) {
                    for (let i = 1; i <= temp.count; i++) {
                        state.cruditems.push(temp);
                    }
                }
                else {
                    state.cruditems.push(temp);
                }
            }


        },
        deleteitem(state, action) {
            const removeitem = state.cruditems.filter((item, index) => index !== action.payload);
            state.cruditems = removeitem
        },
        updateitem(state, action) {
            const { id, title, price, taxes, ads, discount, total, count, category } = action.payload
            state.cruditems.filter((ele, index) => {
                if (id === index) {
                    ele.title = title
                    ele.price = price
                    ele.taxes = taxes
                    ele.ads = ads
                    ele.discount = discount
                    ele.total = total
                    ele.count = count
                    ele.category = category
                }
            })
        },
        filterBySearch(state, action) {
            const { product, search } = action.payload;
            let temp = product.filter(
                (product) =>
                    product.title.toLowerCase().includes(search.toLowerCase()) ||
                    product.category.toLowerCase().includes(search.toLowerCase())
            )
            state.filteritems = temp;
        },
        clearcruds(state) {
            state.cruditems = []
            console.log(state.cruditems);
        }
    },
})
export default crudslice
export const { additem, deleteitem, updateitem, filterBySearch, clearcruds } = crudslice.actions;
export const items = (state) => state.crud.cruditems;
export const filter = (state) => state.crud.filteritems;
