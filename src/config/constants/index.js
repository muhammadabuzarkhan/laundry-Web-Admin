export const SITE_NAME = "Laundry Admin";

const { NODE_ENV } = process.env
const { hostname } = window.location

const servers = {
  local:"http://http://13.60.66.94/api",
  customDev: "http://http://13.60.66.94/api",
  live: "https://grocost.app:3025"
}

var URL;
if (NODE_ENV === "production" && hostname === "react.customdev.solutions") URL = servers.customDev
else if (NODE_ENV === "production" && hostname === "grocost.app") URL = servers.live
else URL = servers.local

export const BASE_URL = URL + "/api/";
export const UPLOADS_URL = URL + "/";
export const UPLOADS_URL2 = URL + "/";
export const SOCKET_URL = URL;


export const AUTH = {
  signin: "admin/auth/signin",
  emailCode: "admin/auth/emailVerificationCode",
  verifyCode: "admin/auth/verifyRecoverCode",
  resetPassword: "admin/auth/resetPassword",
};

export const SURVEY = {
  getUserSurvey: "admin/auth/survey",
};

export const COUPEN = {
  getall : "admin/auth/coupen/get",
  create : "admin/auth/coupen/create",
  delete : "admin/auth/coupen/delete/",
}

export const REFERAL = {
  create : "admin/auth/referal/create",
  getall : "admin/auth/referal/get",
  delete : "admin/auth/referal/delete/",
 
}

export const VERIFICATION = {
  getPackage:"verification-package/list-package",
  updatePackage:"verification-package/create-package-new",
  verifyAccount:"verification-package/verify-user"
}


export const PLANS = {
  getAllPlans: "subscription/logs",
  getPlanById:"subscription/planDetails/",
  updatePlan:"subscription/editPlan/",
  addPlan:"subscription/createPlan",
  deletePlan: "subscription/deletePlan/"
};


export const ADMIN = {
  getStats: "admin/dashboardData",
  getSubscriptionChart: "admin/getEarningChart",
  // getUsersChart: "admin/getUsersChart",
  getAllUsers: "user/getUsers",
  getUserById: "user/getUser/",
  toggleStatus: "user/toggleStatus/", 
  // deleteUser: "/admin/user/deleteUser/",
};

export const USER = {
  updateProfile: "user/updateAccount/",
  changePassword: "admin/auth/resetPassword",
};

export const USERS = {
  // get: "/users/admin",
  getAllUsers: "admin/auth/user/get",
  searchText: "admin/auth/user/search/", 
  datefilter: "admin/auth/user/filter",
  getAllAdmins: "user/admin/getAdmins",
  getAdmin: "user/",
  updateAdmin:"admin/auth/updateAdmin/",
  getuserOrders : "admin/auth/user/userorder/",
  getuserOrdersDetails : "admin/auth/user/userorderdetails/",
  // inactivateuser:"users/inactivateuser",
  getOne: "user/getUserById/",
  toggleStatus: "user/toggleStatus/",
  // deleteUser: "/admin/user/deleteUser/",
};

export const STATES = {
  addState: "/state/addState",
  getAllStates: "/state/getAllStates",
  getStateById: "/state/getStateById/",
  updateState: "/state/updateState/",
  deleteState: "/state/deleteState/",
};

export const POSITIONS = {
  addPosition: "/position/addPosition",
  getAllPositions: "/position/getAllPositions",
  getPositionById: "/position/getPositionById/",
  updatePosition: "/position/updatePosition/",
  deletePosition: "/position/deletePosition/",
};

export const REPORTS = {
  getAllReports: "admin/report",
  getReportById:"admin/post/",
  getPost:"admin/post/",
  deletePost:"post/deleteReport/"
};  

export const REPRESENTATIVE = {
  addRepresentative: "/representative/addRepresentative",
  getAllRepresentatives: "/representative/getAllRepresentatives",
  getRepresentativeById: "/representative/getRepresentativeById/",
  updateRepresentative: "/representative/updateRepresentative/",
  deleteRepresentative: "/representative/deleteRepresentative/",
};

export const DONATIONS = {
  getAllDonations: "/donation/getAllDonations",
};

export const FEEDBACKS = {
  getAllFeedbacks: "contact",
  getFeedbackById:"contact/"
};


export const ORDERS = {
  getAllOrders: "/order/getAllOrders",
  updateOrder: "/order/updateOrder/",
  getOrderById: "/order/getOrderById/",
  deleteOrder: "/order/deleteOrder/",
};

export const CATEGORIES = {
  addCategory: "admin/auth/category/create",
  getAllCategories: "admin/auth/category/get",
  softDeleteCategories : "admin/auth/category/status/",
  searchCategory : "admin/auth/category/search/",
  dateFilter : "admin/auth/category/datefilter",
  getCategoryById: "category/getCategory/",
  toggleStatus: "category/toggleActiveInActive",
  updateCategory: "category/updateCategory/",
  deleteCategory: "category/deleteCategory/",
  getbyid : "admin/auth/category/get/",
  updateCat : "admin/auth/category/edit/",
  edit : "admin/auth/category/updated/"
};

export const SUBCATEGORIES = {
  create : "admin/auth/subcategory/create",
  getAllsubCategories: "admin/auth/subcategory/get",
  filterByCategory : "admin/auth/subcategory/get/",
  softDeletesubCategories : "admin/auth/subcategory/status/",
  searchSubCategory : "admin/auth/subcategory/search/",
  datafilter : "admin/auth/subcategory/datefilter",
  getbyid : "admin/auth/subcategory/data/",
  update : "admin/auth/subcategory/edit/"
}

export const PRODUCTS = {
  getall : "admin/auth/product/get",
  filterbyCategoryId : "admin/auth/product/get/",
  create : "admin/auth/product/create",
  softdelete : "admin/auth/product/status/",
  searchProduct : "admin/auth/product/search/",
  datafilter : "admin/auth/product/datefilter",
  getbyid : "admin/auth/product/Data/",
  update : "admin/auth/product/edit/"

}

export const QUERY = {
  getall : "admin/auth/query/get",
  searchQuery : "admin/auth/query/search/",
  dataFilter : "admin/auth/query/datefilter",
  status : "admin/auth/query/status/"
}

export const ORDER = {
  getall : "admin/auth/order/get",
  orderDetails : "admin/auth/order/get/",
  orderstatus : "admin/auth/order/status/",
  searchOrders : "admin/auth/order/search/",
  dateFilter : "admin/auth/order/datefilter"
}

export const NEWS = {
  addNews: "/news/addNews",
  getAllNews: "/news/getAllNews",
  getNewsById: "/news/getNewsById/",
  updateNews: "/news/updateNews/",
  deleteNews: "/news/deleteNews/",
};



export const EMOTIONS = {
  getAllEmotions: "Emoji/logs",
  addEmoji :"Emoji/create",
  getEmotionsById:"Emoji/getEmotionsById/"
};

export const HISTORIES = {
  addHistory: "/history/addHistory",
  getAllHistorys: "/history/getAllHistorys",
  getHistoryById: "/history/getHistoryById/",
  updateNews: "/history/updateHistory/",
  deleteHistory: "/history/deleteHistory/",
};

export const EVENT = {
  addEvent: "/event/addEvent",
  updateEvent: "/event/updateEvent/",
  getAllEvents: "/event/getAllEvents",
  getEventById: "/event/getEventById/",
  deleteEvent: "/event/deleteEvent/",
  toggleStatus: "/event/toggleStatus",
};



export const PAYMENT = {
  getAllOrderPayments: "payment",
  getOne: "/payment/",
};

export const NOTIFICATION = {
  getAllNotifications: "notification/getAllAdminNotifications",
  getAllUnreadNotifications: "notification/getAllUnreadAdminNotifications",
  getNotificationById: "notification/getNotificationById/",
  toggleNotification: "notification/toggleNotification/",
  sendPushNotification: "notification/send-push-notifications",
  getNotifications: "notification/getNotifications",
  getPushNotificationLogs: "notification/push-logs"
};

export const CONTENT_TYPE = {
  JSON: "application/json",
  FORM_DATA: "multipart/form-data",
};
