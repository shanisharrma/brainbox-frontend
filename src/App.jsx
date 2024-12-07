import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
  About,
  AccountConfirmation,
  Catalog,
  Contact,
  CourseDetails,
  Dashboard,
  Error,
  ForgotPassword,
  Home,
  Login,
  ResetPassword,
  Signup,
  ViewCourse,
} from "./pages";
import { Navbar } from "./components/common";
import { setNavigate } from "./hooks/setNavigate";
import { ProtectedRoute, PublicRoute } from "./components/core/Auth";
import {
  AddCourse,
  Cart,
  EditCourse,
  EnrolledCourses,
  InstructorDashboard,
  MyCourses,
  MyProfile,
  Settings,
} from "./components/core/Dashboard";
import { VideoDetails } from "./components/core/ViewCourse";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <div className="w-screen min-h-screen bg-rich-black-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/catalog/:category" element={<Catalog />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route
          path="/account-confirmation/:token"
          element={<AccountConfirmation />}
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/account-confirmation"
          element={
            <ProtectedRoute>
              <AccountConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route
            path="/dashboard/enrolled-courses"
            element={
              <ProtectedRoute requiredRoles={["student"]}>
                <EnrolledCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/cart"
            element={
              <ProtectedRoute requiredRoles={["student"]}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/my-courses"
            element={
              <ProtectedRoute requiredRoles={["instructor"]}>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/instructor"
            element={
              <ProtectedRoute requiredRoles={["instructor"]}>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/add-course"
            element={
              <ProtectedRoute requiredRoles={["instructor"]}>
                <AddCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/edit-course/:courseId"
            element={
              <ProtectedRoute requiredRoles={["instructor"]}>
                <EditCourse />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <ViewCourse />
            </ProtectedRoute>
          }
        >
          <Route
            path="/view-course/:courseId/section/:sectionId/subsection/:subsectionId"
            element={
              <ProtectedRoute requiredRoles={["student"]}>
                <VideoDetails />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
