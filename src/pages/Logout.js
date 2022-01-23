
export const Logout = () => {
    alert('You have logged out');
    localStorage.removeItem("token"); // logout by remove the token
    
}