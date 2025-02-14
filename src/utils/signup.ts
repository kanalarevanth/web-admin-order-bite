const { VITE_API_URL } = import.meta.env;

export const addUser = async (data: unknown = {}) => {
  try {
    const res = await fetch(`${VITE_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const data = (await res.json()).data;
      if (data) {
        return data;
      }
      return false;
    }
    return false;
  } catch (error) {
    if (error?.status === 409) {
      console.log("User Account already exists.");
      return { status: error?.status };
    } else {
      console.log("apiErrors.somethingWrong");
    }
    return null;
  }
};
