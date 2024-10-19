import React, { useEffect } from "react";
import { asyncLoadPerson, removePerson } from "../store/actions/personAction";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./templates/Loading";
import HorizontalCards from "./templates/HorizontalCards";

const PersonDetails = () => {

const navigate = useNavigate();
const dispatch = useDispatch();
const { id } = useParams();
const { info } = useSelector((state) => state.person);
const { pathname } = useLocation();

useEffect(() => {
  dispatch(asyncLoadPerson(id));

  return () => {
    dispatch(removePerson());
  };
}, [id]);

console.log(info);


  return info ?  <div>person details</div> : <Loading />
};

export default PersonDetails;
