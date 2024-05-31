import { redirect } from "react-router-dom";
export function checkLoggedInLoader() {
    const token = localStorage.getItem('token')
    if (token !== null) {
      return redirect("/");
    }
    return null;
}

export function checkExpiredToken() {
    let state = false
    const localToken = localStorage.getItem('token')
    localToken != null || localToken != undefined ? (
            fetch('http://localhost:3001/auth/valid',{
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${localToken}`
                }
            }).then((data) => data.json()).then((validState) => {
                if(validState.valid == 'Valid') state = true
                else if (validState.valid == 'TokenExpiredError') state = false
                else if (validState.valid == 'Invalid token') state = false
            }).catch((e) => console.log(e))
        ) : state = false
    

    return state;
}

//   export function checkRegisteredUserLoader() {
//     const token = authService.getToken();
//     if (token === null) {
//       return redirect("/access-denied");
//     } else if (token && authService.isTokenExpired()) {
//       localStorage.removeItem("token");
//       return redirect("/");
//     }
//     return null;
//   }
