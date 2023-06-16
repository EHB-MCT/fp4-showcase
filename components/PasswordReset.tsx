import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/router"
import { confirmThePasswordReset } from "../lib/auth"
import ButtonPink from "./ButtonPink"


const defaultFormFields = {
  password: '',
  confirmPassword: '',
}

function PasswordReset() {
  /**
   * Extract oobCode from the URL.
   * Delete console.log in production.
   */
//   const navigate = useNavigate()
  const router = useRouter()
  const [successMessage, setSuccessMessage] = useState(false)
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { password, confirmPassword } = formFields

  let oobCode:string | null = router.query.oobCode as string
  console.log(oobCode)
  console.log(router.query)
  
  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    )
  }

  const onClick = () => {
    return null
    }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert("Passwords did not match.")
      return;
    }

    try {
      if (oobCode) {
        await confirmThePasswordReset(oobCode, confirmPassword)
        resetFormFields()
        setSuccessMessage(true)
      } else {
        alert('Something is wrong; try again later!')
        console.log('missing oobCode')
      }
    } catch (error:any) {
      if (error.code === 'auth/invalid-action-code') {
        alert('Something is wrong; try again later.')
      }
      console.log(error.message)        
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormFields({...formFields, [name]: value })
  }

  return(
    <>
      {
        successMessage ?
        <div>
          <h3>Success! Your Password change successfully</h3>
          {/* <button 
            onClick={() => navigate('/')}
          >
            Go to the Login page
          </button> */}
        </div> : 
        


        <form
            onSubmit={handleSubmit}
            className="w-2/2 flex flex-col gap-4 items-cente p-5 rounded-xl mb-5 mt-5 border-2 border-purple-500"
        >
        <h1 className="text-center text-white text-2xl">Reset Password</h1>
        <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>
        <div className="flex flex-col gap-2 items-start w-full"></div>
        <label className="text-white" htmlFor="pwinput">
          Password:
        </label>
        <div style={{ position: "relative" }}>
          <svg
            width="100%"
            height="50"
            viewBox="0 0 570 50"
            preserveAspectRatio="none"
          >
            <path
              id="Path_1213"
              data-name="Path 1213"
              d="M1618.957,5931.394v-27.36l-18.019-13.388-538.938,1.6v27.544l17.982,11.6Z"
              transform="translate(-1061 -5889.645)"
              fill="#202033"
              stroke="#fff"
              strokeWidth="2"
              opacity="0.66"
            />
          </svg>
          <input
            type="password"
            placeholder="New Password"
            id="pwInput"
            name="password"
            value={password}
            onChange={handleChange}
            style={{ position: "absolute", top: "1px", width: "80%" }}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white w-90 mx-4  "
            required
          />
          <label className="text-white" htmlFor="confirmpwInput">
          Confirm password:
        </label>
        <div style={{ position: "relative" }}>
          <svg
            width="100%"
            height="50"
            viewBox="0 0 570 50"
            preserveAspectRatio="none"
          >
            <path
              id="Path_1213"
              data-name="Path 1213"
              d="M1618.957,5931.394v-27.36l-18.019-13.388-538.938,1.6v27.544l17.982,11.6Z"
              transform="translate(-1061 -5889.645)"
              fill="#202033"
              stroke="#fff"
              strokeWidth="2"
              opacity="0.66"
            />
          </svg>
          <input
            type="password"
            placeholder="New Password"
            id="confirmpwInput"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            style={{ position: "absolute", top: "1px", width: "80%" }}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white w-90 mx-4  "
            required
          />
        </div>

       

        <ButtonPink title="Submit" color="white" onClick={onClick} />
       
        </div>
        </form>
        }
      
    </> )
  
}

export default PasswordReset