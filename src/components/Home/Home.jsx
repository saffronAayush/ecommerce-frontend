import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import MetaData from "../layout/MetaData.jsx";
import { GetProduct, ClearErrors } from "../../action/ProductAction.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeLoad from "./ProductLoaderContainer.jsx";
const Home = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(
        (state) => state.AllProducts
    );
    useEffect(() => {
        if (error) {
            dispatch(ClearErrors());
            toast.error(error);
        }
        dispatch(GetProduct());
    }, []);

    window.addEventListener("contextmenu", (e) => e.preventDefault());
    return (
        <>
            <MetaData title="Ecommerce-Home" />
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            {loading ? (
                <HomeLoad />
            ) : (
                <div className="container" id="container">
                    {products &&
                        products.map((product) => {
                            return (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            );
                        })}
                </div>
            )}
        </>
    );
};

export default Home;
