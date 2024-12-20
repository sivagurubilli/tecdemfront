import React from "react";
import { Link } from "react-router-dom";
import { getUserData } from "../middleware/auth";
import Arrow from "./arrow";
export default function Orderconfirmpage() {
    let user = getUserData().userdata
    return (
        <>
            <div class="content-wrapper">
                <div class="container-fluid flex-grow-1 container-p-y">
                    <div class="row">
                        <div class="col-md-12 col-lg-8 mx-lg-auto">
                            <div class="card">
                                <div class="card-body text-center">
                                    <h2 class="mt-2">Thank You! 😇</h2>
                                    <p>Your order <b>#1536548131</b> has been placed!</p>
                                    <p>We sent an email to <b>{user && user.email_id}</b>with your order confirmation and receipt. If the email hasn't arrived within two minutes, please check your spam folder to see if the email was routed there.</p>
                                    <hr />
                                    <p>You can find all your courses in My Courses. Click Below Button</p>
                                    <a href={"/mycourse"} class="btn btn-primary">
                                        <Arrow /> My Courses</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-backdrop fade"></div>
            </div >
        </>
    )

}
