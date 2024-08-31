import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClass from "../pages/Classes/SingleClass";
import DashBoardLayout from "../layout/DashBoardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import SelectedClasses from "../pages/Dashboard/Student/SelectedClasses";
import MyPaymentHistory from "../pages/Dashboard/Student/Payment/History/MyPaymentHistory";

import AsInstructor from "../pages/Dashboard/Student/Apply/AsInstructor";
import Payment from "../pages/Dashboard/Student/Payment/History/Payment";
import Pkoae from "../pages/Dashboard/Student/Payment/History/asdijia";


 export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "instructors",
        element: <Instructors/>
      },
      {
        path: "classes",
        element: <Classes/>
      }, 
      {
        path: "/login",
        element: <Login/>
      },{
        path: "/register",
        element: <Register/>
      },
      {
        path: "/class/:id",
        element: <SingleClass/>,
        loader: ({params}) => fetch(`http://localhost:3000/class/${params.id}`)
      },
      
      
    ]
    
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout/>,
    children: [
      {
        index:true,
        element: <Dashboard/>
      },
      // students routes
      {
        path: 'student-cp',
        element: <StudentCP/>
      },
      {
        path: 'enrolled-class',
        element: <EnrolledClasses/>
      },
      {
        path: 'my-selected',
        element: <SelectedClasses/>
      },
      {
        path: 'my-payments',
        element: <MyPaymentHistory/>
      },
      {
        path: 'apply-instructor',
        element: <AsInstructor/>
      },
      
      {
        path: 'user/payment',
        element: <Payment/>
      },
      
    ]
  }

 

]);