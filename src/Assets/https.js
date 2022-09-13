import axios from "axios";

const https = axios.create({
    baseURL: "http://iztileuoff.beget.tech/api",
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        Authorization: "Bearer " + window.localStorage.getItem('token'),
        // 'X-CSRF-TOKEN':'eyJpdiI6IkxCQmN0YVRWUkl1RlkzcEM2YWh2Znc9PSIsInZhbHVlIjoieEdvbC9LZmJmdzhBT01ub1R3anBXdjU4QXlEUlpmSUwrc0IyOXV3WEpIMTNaeEdZV0VCVU5wdHFNbStvWlJ1R1dHbEJqYTJTMHVEVUFQR1FzYXloNzlGYlh5bW9qQW8xSGhkY2hlU0xUcUpsdUVwc2crWjFzRXA1Ri9xWE5YVzgiLCJtYWMiOiJhZjE2OTAxMmI1MDQ4ZDI1MzhkMTRkOTQ4NzExNTdlZTU3MWI1ZWRlYThjYzc3NjAzMDJhMDQ1NWE5N2NlNTlhIiwidGFnIjoiIn0%3D; expires=Sun, 31-Jul-2022 11:24:53 GMT; Max-Age=7200; path=/; domain=localhost; samesite=lax'
    }

})

export default https; 