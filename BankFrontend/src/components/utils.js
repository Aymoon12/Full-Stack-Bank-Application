import {useNavigate} from "react-router-dom";

export const getToken = () => {
    return localStorage.getItem('token');
};
export const getUser = () => {
    let user = localStorage.getItem('user')
    return JSON.parse(user)
}
export const toLoginPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    navigate('/');

}

