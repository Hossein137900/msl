'use client'
import createNewUser from "@/lib/action"

const Test = () => {
    const handleSubmit = async (formData: FormData) => {
        await createNewUser(formData)
    }

    return (
        <form action={handleSubmit}>
            <input placeholder="name " type="text" name="username" />
            <input placeholder="password " type="password" name="password" />
            <input placeholder="phone number "type="text" name="phoneNumber" />
            <button className="bg-red-200" type="submit">Submit</button>
        </form>
    )
}

export default Test
