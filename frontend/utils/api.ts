const BASE_URL = "http://localhost:3000"

interface ApiOptions extends RequestInit {
  token?: string | null
}

export async function apiRequest(endpoint: string, options: ApiOptions = {}) {
    console.log("endpoint", endpoint)
    console.log("options", options)
  const { token, ...restOptions } = options
  console.log("token", token)

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...restOptions.headers,
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...restOptions,
      headers,
    })

    if (response.status === 401) {
      throw new Error("Unauthorized")
    }

    if (!response.ok) {
      throw new Error("API request failed")
    }
    console.log("response", response)
    return await response.json()
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      // Handle unauthorized error (e.g., redirect to login)
      window.location.href = "/login"
      return null
    }
    throw error
  }
}

// export async function login(email: string, password: string) {
//     var email = "shurti@example.com";
//     var password = "password1234";
//   const response = await apiRequest("/login", {
//     method: "POST",
//     body: JSON.stringify({ email, password }),
//   })

//   return response?.token
// }