const URL = "https://apparent-hugely-parakeet.ngrok-free.app/api/";

const getSessionIdFromCookie = () => {
  const cookies = document.cookie.split('; ');
  const sessionCookie = cookies.find(cookie => cookie.startsWith('session_id='));
  return sessionCookie ? sessionCookie.split('=')[1] : null;
};

const fetchData = async (request) => {
  const sessionId = getSessionIdFromCookie(); 
  try {
    const response = await fetch(`${URL + request}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${sessionId}`,
          "ngrok-skip-browser-warning": "69420",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data:", request, data);
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    return null;
  }
};

const sendData = async (request, formData) => {
  const sessionId = getSessionIdFromCookie();
  try {
    const response = await fetch(`${URL}${request}`, {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${sessionId}`,
          "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log("post:", request, result);
    return result;
  } catch (error) {
    console.error("Error sending data:", error);
    return null;
  }
};

const sendJsonData = async (request, formData) => {
  const sessionId = getSessionIdFromCookie();
  try {
    const response = await fetch(`${URL}${request}`, {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${sessionId}`,
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",

      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log("post:", request, result);
    return result;
  } catch (error) {
    console.error("Error sending data:", error);
    return null;
  }
};

const deleteData = async (request, formData) => {
  const sessionId = getSessionIdFromCookie(); 
  try {
    const response = await fetch(`${URL + request}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${sessionId}`,
          "ngrok-skip-browser-warning": "69420",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data:", request, data);
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    return null;
  }
};

//Parks

export const getAllParks = async () => {
  const response = await fetchData(`parks/getAll`);
  return response;
};

export const addPark = async (formData) => {
  const response = await sendData(`parks/add`, formData);
  return response;
};
export const getPark = async (parkId) => {
  const response = await fetchData(`parks/getPark/${parkId}`);
  return response;
};

export const editPark = async (formData) => {
  const response = await sendData(`parks/update`,formData);
  return response;
};

export const Login = async (data) => {
  const response = await sendJsonData(`parks/login`, data);
  return response;
};
export const removePark = async (data) => {
  const response = await sendJsonData(`parks/remove`, data);
  return response;
};

//Sessions 

export const verifySession = async () => {
  const response = await fetchData("parks/sessions/verify");
  return response;
};

export const updateSession = async (id) => {
  const response = await sendJsonData("parks/sessions/update", id);
  return response;
};

export const removeSession = async () => {
  const response = await fetchData("parks/sessions/remove");
  return response;
};
//Dashboard
export const fetchCustomPieChart = async (startFormat,endFormat) => {
  const response = await fetchData(`analytics/expenses`+`?start_date=${startFormat}&end_date=${endFormat}`);
  return response;
};

export const fetchAnalytics = async (startFormat,endFormat) => {
  const response = await fetchData(`analytics/custom`+`?start_date=${startFormat}&end_date=${endFormat}`);
  return response;
};
export const fetchLastInvoices = async () => {
  const response = await fetchData(`analytics/custom`);
  return response;
};
export const fetchServiced = async () => {
  const response = await fetchData(`analytics/serviced`);
  return response;
};


//Cars

export const getAllCars = async () => {
  const response = await fetchData(`cars/getAll`);
  return response;
};

export const getAllBrands = async () => {
  const response = await fetchData(`cars/brands/get_all`);
  return response;
};

export const AddNewCar = async (formData) => {
  const response = await sendData("cars/add", formData);
  return response;
};

export const getCar= async (id) => {
  const response = await fetchData(`cars/get`+`?id=${id}`);
  return response;
};

export const updateCar = async (formData) => {
  const response = await sendData("cars/update", formData);
  return response;
};

export const updateServiceInterval = async (updatedData) => {
  const response = await sendJsonData("cars/update_service_interval", updatedData);
  return response;
};

export const removeCar = async (data) => {
  const response = await sendJsonData("cars/remove", data);
  return response;
};

//Drivers 
export const getAllDrivers = async () => {
  const response = await fetchData(`drivers/getAll`);
  return response;
};

export const addDriver = async (formData) => {
  const response = await sendData("drivers/add", formData);
  return response;
};

export const removeDriver = async (data) => {
  const response = await sendJsonData("drivers/remove", data);
  return response;
};

export const getDriver = async (driverId) => {
  const response = await fetchData("drivers/get"+`?id=${driverId}`);
  return response;
};

export const updateDriver = async (formData) => {
  const response = await sendData("drivers/update", formData);
  return response;
};

//Services

export const getAllServices = async (query) => {
  const response = await fetchData("services/getAll"+`?${query}`);
  return response;
};

export const deleteService = async (id) => {
  const response = await deleteData("services/delete"+`?id=${id}`);
  return response;
};
export const getService = async (id) => {
  const response = await fetchData("services/get"+`?id=${id}`);
  return response;
};

//Invoices

export const getInvoice = async (id) => {
  const response = await fetchData("invoices/get"+`?id=${id}`);
  return response;
};
export const parkInvoices = async (queryString) => {
  const response = await fetchData("invoices/park"+`?${queryString}`);
  return response;
};

export const downloadPdf = async (id) => {
  const response = await fetchData("invoices/download-pdf"+`?id=${id}`);
  return response;
};

export const updateInvoice = async (data) => {
  const response = await sendJsonData("invoices/update",data);
  return response;
};
