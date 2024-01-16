const Users = () => {

    return <div className="">
        In this example:

        The getCurrentUser middleware is used to attach the current user to the req object.
        The /users endpoint retrieves all users from the MongoDB collection excluding the current user using the $ne (not equal) operator.

        Make sure to adjust the code according to your actual setup and authentication mechanism. This is a basic example, and you might need to add additional error handling and security measures based on your application requirements.
    </div>
}
export default Users