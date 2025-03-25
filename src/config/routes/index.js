import { BrowserRouter, Route, Routes } from "react-router-dom";

//views imports
import UserAuthCheck from "../../components/AuthCheck/UserAuthCheck";
import ClientLayout from "../../components/ClientLayout";
import Plans from "../../views/Plans";
import AddPlan from "../../views/Plans/addNewPlan";
import PlanDetails from "../../views/Plans/planDetails";
import Dashboard from "../../views/dashboard";
import Feedbacks from "../../views/feedback";
import FeedbackDetails from "../../views/feedback/feedbackDetails";
import ForgotPassword from "../../views/forget-password-1";
import ForgotPassword2 from "../../views/forget-password-2";
import ForgotPassword3 from "../../views/forget-password-3";
import PushNotifications from "../../views/push-notifications";
import PushNotificationDetails from "../../views/push-notifications/pushNotificationDetails";
import AddNotification from "../../views/push-notifications/pushNewNotification";
import Notifications from "../../views/notifications";
import NotificationDetails from "../../views/notifications/notificationDetails";
import PaymentLogs from "../../views/payment-logs";
import Profile from "../../views/profile";
import ChangePass from "../../views/profile/changePass";
import Signin from "../../views/signin";
import Users from "../../views/users";
import UserDetails from "../../views/users/userDetails";

import Categories from "../../views/category-management/index";
import EditCategory from "../../views/category-management/editCategory";
import AddCategory from "../../views/category-management/addCategory";

import SubCategories from "../../views/subCategory-management/SubCategories";
import EditSubCategories from "../../views/subCategory-management/EditSubCategories";
import AddSubCategories from "../../views/subCategory-management/AddSubCategories";

import Product from "../../views/product-management/Product";
import EditProduct from "../../views/product-management/EditProduct";
import AddProduct from "../../views/product-management/AddProduct";

import Query from "../../views/query-management/Query"

import Order from "../../views/order-management/Order"
import OrderDetails from "../../views/order-management/OrderDetails"

import UserOrders from "../../views/order-management/myOrders"
import UserOrdersDetails from "../../views/order-management/myOrders/OrderDetails"

import Coupen from "../../views/coupen-manageement"
import AddCoupen from "../../views/coupen-manageement/AddCoupen"

import Referal from "../../views/referal-management"
import AddReferal from "../../views/referal-management/AddReferal"

const MyRouter = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/signin" index element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-2" element={<ForgotPassword2 />} />
        <Route path="/forgot-password-3" element={<ForgotPassword3 />} />
        <Route
          path="/"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
                activeTab="dashboard"
              >
                <Dashboard />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/users"
          activeTab="users"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Users",
                  description: "Some Description.",
                }}
              >
                <Users />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/userOrders/:id"
          activeTab="users"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Users",
                  description: "Some Description.",
                }}
              >
                <UserOrders />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

          <Route
          path="/userOrdersDetails/:id"
          activeTab="users"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Users",
                  description: "Some Description.",
                }}
              >
                <UserOrdersDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/userSurvey/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "User Details",
                  description: "Some Description.",
                }}
              >
                <UserDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/feedbacks"
          activeTab="donations"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Feedbacks",
                  description: "Some Description.",
                }}
              >
                <Feedbacks />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/feedbacks/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Feedback Details",
                  description: "Some Description.",
                }}
              >
                <FeedbackDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />


        <Route
          path="/plans"
          activeTab="plans"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Plans",
                  description: "Some Description.",
                }}
              >
                <Plans />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/plans/:id"
          activeTab="state"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Plans Detail",
                  description: "Some Description.",
                }}
              >
                <PlanDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/plans/addPlan"
          activeTab="plans"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Add Plan",
                  description: "Some Description.",
                }}
              >
                <AddPlan />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/payments"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Payment Logs",
                  description: "Some Description.",
                }}
              >
                <PaymentLogs />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/profile"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "profile",
                  description: "Some Description.",
                }}
              >
                <Profile />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/profile/changePass"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "ChangePass",
                  description: "Some Description.",
                }}
              >
                <ChangePass />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
                  path="/categories"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Categories",
                          description: "Some Description.",
                        }}
                      >
                        <Categories />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />
                <Route
                  path="/categories/editCategory/:id"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Edit Category",
                          description: "Some Description.",
                        }}
                      >
                        <EditCategory />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />
                <Route
                  path="/categories/addCategory"
                  activeTab="categories"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Add Category",
                          description: "Some Description.",
                        }}
                      >
                        <AddCategory />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />

<Route
                  path="/subcategories"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Sub Categories",
                          description: "Some Description.",
                        }}
                      >
                        <SubCategories />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />
                <Route
                  path="/subcategories/editSubcategories/:id"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Edit Category",
                          description: "Some Description.",
                        }}
                      >
                        <EditSubCategories />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />
                <Route
                  path="/subcategories/addSubCategory"
                  activeTab="subcategories"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Add Sub Category",
                          description: "Some Description.",
                        }}
                      >
                        <AddSubCategories />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />

                <Route
                  path="/product"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Product",
                          description: "Some Description.",
                        }}
                      >
                        <Product />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />
                <Route
                  path="/product/editProduct/:id"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Edit Product",
                          description: "Some Description.",
                        }}
                      >
                        <EditProduct />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />
                <Route
                  path="/product/addProduct"
                  activeTab="product"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Add Product",
                          description: "Some Description.",
                        }}
                      >
                        <AddProduct />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />

              <Route
                  path="/query"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Query",
                          description: "Some Description.",
                        }}
                      >
                        <Query />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />

              <Route
                  path="/order"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Order",
                          description: "Some Description.",
                        }}
                      >
                        <Order />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />

                <Route
                  path="/orderDetails/:id"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Order Details",
                          description: "Some Description.",
                        }}
                      >
                        <OrderDetails />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />

                <Route
                  path="/coupen"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Product",
                          description: "Some Description.",
                        }}
                      >
                        <Coupen />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />

                <Route
                  path="/addcoupen"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Product",
                          description: "Some Description.",
                        }}
                      >
                        <AddCoupen />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />


<Route
                  path="/referal"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Product",
                          description: "Some Description.",
                        }}
                      >
                        <Referal />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />

                <Route
                  path="/addreferal"
                  index
                  element={
                    <UserAuthCheck>
                      <ClientLayout
                        head={{
                          title: "Product",
                          description: "Some Description.",
                        }}
                      >
                        <AddReferal />
                      </ClientLayout>
                    </UserAuthCheck>
                  }
                />



        <Route
          path="/pushnotifications"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Notifications",
                  description: "Some Description.",
                }}
              >
                <PushNotifications />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/pushnotifications/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Notification Details",
                  description: "Some Description.",
                }}
              >
                <PushNotificationDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/pushnotifications/addNotification"
          activeTab="pushnotifications"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Add Notification",
                  description: "Some Description.",
                }}
              >
                <AddNotification />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/notifications"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Notifications",
                  description: "Some Description.",
                }}
              >
                <Notifications />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/notifications/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Notification Details",
                  description: "Some Description.",
                }}
              >
                <NotificationDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
