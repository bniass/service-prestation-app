import { useEffect, useState } from "react";


export default function FormService({ onClose }){

    const [inputs, setInputs] = useState({});
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => {
        return ({...values, [name]: value})
      })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs)
        /*
        try {
            //const response = await loginUser({ username: formData.username, password: formData.password });
            // Traitez la réponse de votre API ici
            navigate("/createcompte");
            //console.log('Login successful:', response);
        } catch (error) {
            //console.log('Login successful:', error);
            openModal();
            setErrorMessage('An error occurred while logging in');
        }
        */
    };
    
    
    

    return (
        <fieldset className="border border-solid border-gray-300 p-3">
            <legend className="text-sm">ENREGISTREMENT D'UN SERVICE !</legend>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="libelle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Libelle</label>
                    <input value={inputs.libelle || ""} 
                    onChange={handleChange} name="libelle" type="text" id="libelle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Libelle classe" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="prix" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prix</label>
                    <input value={inputs.prix || ""} 
                    onChange={handleChange} type="text" name="prix" id="prix" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Code classe" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input value={inputs.fraisInscription || ""} 
                    onChange={handleChange} type="text" name="fraisInscription" id="fraisInscription" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Frais d'inscription de la classe" required />
                </div>
                <div className="px-6 py-4">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">ENREGISTRER</button>
                    
                    <button onClick={onClose} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 m-4">FERMER</button>
                </div>
            </form>
        </fieldset>
    )
}