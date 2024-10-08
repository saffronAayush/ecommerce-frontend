import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Logout } from "../../../action/UserAction";
import Loader from "../Loader/Loader";

const UserOptions = () => {
    const { LogedUser, loading } = useSelector((state) => state.User);
    const { cartItems } = useSelector((state) => state.Cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
            icon: (
                <ShoppingCartIcon
                    style={{
                        color: cartItems.length > 0 ? "tomato" : "unset",
                    }}
                />
            ),
            name: "Cart",
            name: `Cart(${cartItems.length})`,
            func: cart,
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];
    if (LogedUser.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        navigate("/admin/dashboard");
    }

    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/account");
    }
    function cart() {
        navigate("/cart");
    }
    function logoutUser() {
        dispatch(Logout());

        toast.success("Logout Successfully");
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Backdrop open={open} style={{ zIndex: "10" }} />
                    <SpeedDial
                        ariaLabel="SpeedDial tooltip example"
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        style={{ zIndex: "11" }}
                        open={open}
                        direction="down"
                        className="speedDial"
                        icon={
                            <img
                                className="speedDialIcon"
                                src={
                                    LogedUser.avatar
                                        ? LogedUser.avatar.url
                                        : "/Profile.png"
                                }
                                alt="Profile"
                            />
                        }
                    >
                        {options.map((item) => (
                            <SpeedDialAction
                                key={item.name}
                                icon={item.icon}
                                tooltipTitle={item.name}
                                onClick={item.func}
                                tooltipOpen={
                                    window.innerWidth <= 600 ? true : false
                                }
                            />
                        ))}
                    </SpeedDial>
                    <ToastContainer />
                </>
            )}
        </>
    );
};

export default UserOptions;
