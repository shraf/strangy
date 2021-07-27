import {useState,React} from 'react';
const useForm = (initialState = {}) => {
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        if(e.target.name=="msg"&&e.key=="Enter"&&e.altKey){
            formData.msg=formData.msg+"\r\n";
        }
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return { formData, handleInputChange };
}
export default useForm;