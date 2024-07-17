export const Domain = [
  "http://localhost:5000",
  "http://backend.mern.change-networks.com"
];

export const Beta_URL = 1;

export const API_URL_v1 = {
  // # Carrer Pages API
  GET_JOB_DESCRIPTION: `${Domain[Beta_URL]}/api_v1/career/get-details`,
  GET_JOB_DESCRIPTION_BY_ID: `${Domain[Beta_URL]}/api_v1/career/get-details-by-id`,

  // # GPL Quote Page
  GET_TOP_SEARCH_FREQUENCY: `${Domain[Beta_URL]}/api_v1/product/top-search-frequency`,
  SEARCH_BY_PROC_CODE: `${Domain[Beta_URL]}/api_v1/product/get-product`,
  GPL_QUOTE_FORM: `${Domain[Beta_URL]}/api_v1/product/quote`,
  GPL_QUOTE_FORM_EMAIL_SEND: `${Domain[Beta_URL]}/api_v1/product/SendEmail`,
  GET_ALL_PRODUCT_DATA: `${Domain[Beta_URL]}/api_v1/product/get-all-product`,
  // #Contact us
  COUNTRY_LIST: `${Domain[Beta_URL]}/api_v1/country/country`,
  CONTACT_US: `${Domain[Beta_URL]}/api_v1/contact/ContactUs`,
  CONTACT_US_SEND_EMAIL: `${Domain[Beta_URL]}/api_v1/contact/SendEmail`,

  //Admin  #Gallery
  ADD_IMAGE: `${Domain[Beta_URL]}/api_v1/gallery/add-images`,
  GET_GALLERY_IMAGES: `${Domain[Beta_URL]}/api_v1/gallery/get-admin-images`,
  DELETE_GALLERY_IMAGES: `${Domain[Beta_URL]}/api_v1/gallery/delete-images`,

  // ! Admin API
  // # Admin Login
  ADMIN_LOGIN: `${Domain[Beta_URL]}/api_v1/auth/login`,

  // # Forgot Password
  FORGOT_PASSWORD: `${Domain[Beta_URL]}/api_v1/auth/forgot_password`,

  // # Verfiy And Update Password
  VERIFY_AND_UPDATE_PASSWORD: `${Domain[Beta_URL]}/api_v1/auth/verfiy_otp`,

  // # Logout
  LOGOUT: `${Domain[Beta_URL]}/api_v1/auth/logout`,

  // # Refresh Token
  REFRESH_TOKEN: `${Domain[Beta_URL]}/api_v1/auth/refresh_token`,

  // # Admin Price List
  GET_PRODUCT_DATA: `${Domain[Beta_URL]}/api_v1/stock-list/get-product`,
  CLONE_PRODUCT_DATA: `${Domain[Beta_URL]}/api_v1/stock-list/clone-product`,
  UPDATE_PRODUCT_DATA: `${Domain[Beta_URL]}/api_v1/stock-list/update-product`,
  DELETE_PRODUCT_DATA: `${Domain[Beta_URL]}/api_v1/stock-list/delete-product`,
  ADD_PRODUCT_DATA: `${Domain[Beta_URL]}/api_v1/stock-list/add-product`,

  //Admin Promotion List
  GET_PROMOTION_LIST: `${Domain[Beta_URL]}/api_v1/promotion/get-promotion-data`,
  UPDATE_PROMOTION_LIST: `${Domain[Beta_URL]}/api_v1/promotion/update-promotion-data`,
  DELETE_PROMOTION_LIST: `${Domain[Beta_URL]}/api_v1/promotion/delete-promotion-data`,
  ADD_PROMOTION_LIST: `${Domain[Beta_URL]}/api_v1/promotion/add-promotion-data`,

  //Admin Weight List
  GET_WEIGHT_LIST: `${Domain[Beta_URL]}/api_v1/weight-list/get-weightList-data`,
  UPDATE_WEIGHT_LIST: `${Domain[Beta_URL]}/api_v1/weight-list/update-weightList-data`,
  DELETE_WEIGHT_LIST: `${Domain[Beta_URL]}/api_v1/weight-list/delete-weightList-data`,
  ADD_WEIGHT_LIST: `${Domain[Beta_URL]}/api_v1/weight-list/add-weightList-data`,

  //Admin Customer List
  GET_CUSTOMER_LIST: `${Domain[Beta_URL]}/api_v1/customer-list/get-customer-data`,
  ADD_CUSTOMER_LIST: `${Domain[Beta_URL]}/api_v1/customer-list/add-customer-data`,
  UPDATE_CUSTOMER_LIST: `${Domain[Beta_URL]}/api_v1/customer-list/update-customer-data`,

  GET_USER_DATA: `${Domain[Beta_URL]}/api_v1/auth/user-data`,

  //Email List Matrix
  GET_EMAIL_LIST: `${Domain[Beta_URL]}/api_v1/email-list/get-count-email`,
  UPDATE_EMAIL_LIST: `${Domain[Beta_URL]}/api_v1/email-list/update-email`,
  DELETE_EMAIL_LIST: `${Domain[Beta_URL]}/api_v1/email-list/delete-email`,

  //Sales Matrix
  GET_SALES_DATA: `${Domain[Beta_URL]}/api_v1/sales-matrix/get-sales-data`,
  ADD_SALES_DATA: `${Domain[Beta_URL]}/api_v1/sales-matrix/add-sales-data`,
  DELETE_SALES_DATA: `${Domain[Beta_URL]}/api_v1/sales-matrix/delete-sales-data`,
  UPDATE_SALES_DATA: `${Domain[Beta_URL]}/api_v1/sales-matrix/update-sales-data`,

  //Quote Tool
  GET_CUSTOMER_USER_DETAILS: `${Domain[Beta_URL]}/api_v1/quote-tool/get-customerQuote-details`,
  ADD_QUOTE_DETAILS: `${Domain[Beta_URL]}/api_v1/quote-tool/add-quote-details`,
  DELETE_QUOTE_MATRIX_DATA: `${Domain[Beta_URL]}/api_v1/quote-matrix/delete-quote-details`,

  //Quote Matix
  GET_QUOTE_MATRIX_DATA: `${Domain[Beta_URL]}/api_v1/quote-matrix/get-quotematrix-data`,
  // # Admin Job

  ADD_JOB: `${Domain[Beta_URL]}/api_v1/job/add-job`,

  // # Update Admin Job
  UPDATE_JOB: `${Domain[Beta_URL]}/api_v1/job/update-job`,

  // # Delete Admin Job
  DELETE_JOB: `${Domain[Beta_URL]}/api_v1/job/delete-job`,

  // # Get Candidate List
  GET_CANDIDATE_LIST: `${Domain[Beta_URL]}/api_v1/candidate/get-candidate-list`,

  // # Get User Admin  Details
  GET_USER_ADMIN: `${Domain[Beta_URL]}/api_v1/user/get_details`,

  // # Add User Admin
  ADD_USER_ADMIN: `${Domain[Beta_URL]}/api_v1/user/add_user`,

  // # Verify User Admin
  VERIFY_USER_ADMIN: `${Domain[Beta_URL]}/api_v1/auth/verfiy_token`,

    // # Edit Access Level
    EDIT_ACCESS_LEVEL:`${Domain[Beta_URL]}/api_v1/auth/edit_access_level`,

    // # Get Admin Types
    GET_ADMIN_TYPES:`${Domain[Beta_URL]}/api_v1/user/get_type`,
};

export const AdminLeftSideBarLinks = [
  {
    SR: "1",
    label: "Dashboard",
    to: "/change/dashboard",
    icon: "bi-house-door",
  },
  {
    SR: "2",
    label: "Gallery",
    to: "/change/gallery",
    icon: "bi-kanban",
  },
  {
    SR: "3",
    label: "Customer List",
    to: "/change/customer-list",
    icon: "bi-basket",
  },
  {
    SR: "4",
    label: "Product List",
    to: "/change/price-list",
    icon: "bi-basket",
  },
  {
    SR: "5",
    label: "Promotion",
    to: "/change/promotion",
    icon: "bi-basket",
  },
  {
    SR: "6",
    label: "Email Matrix",
    to: "/change/email-matrix",
    icon: "bi-basket",
  },
  {
    SR: "7",
    label: "Sales Martix",
    to: "/change/sales-matrix",
    icon: "bi-basket",
  },
  {
    SR: "9",
    label: "Quote Tool",
    to: "/change/quote-tool",
    icon: "bi-basket",
  },
  {
    SR: "10",
    label: "Quote Matrix",
    to: "/change/quote-matrix",
    icon: "bi-basket",
  },
  {
    SR: "11",
    label: "Order Matrix",
    to: "/change/order-matrix",
    icon: "bi-basket",
  },
  {
    SR: "12",
    label: "Job List",
    to: "/change/job-list",
    icon: "bi-basket",
  },
  {
    SR: "13",
    label: "Candidate List",
    to: "/change/job/candidate",
    icon: "bi-basket",
  },
];
