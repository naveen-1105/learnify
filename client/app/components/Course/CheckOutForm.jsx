import React, { useEffect, useState } from 'react'
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { useCreateOrderMutation } from '../../../redux/feature/orders/orderApi'
import { useLoadUserQuery } from '../../../redux/feature/api/apiSlice'

import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI;
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });


const CheckOutForm = ({ setOpen, data }) => {
    const [loadUser, setLoadUser] = useState(false);
    
    const {
      data: user,
      refetch,
      isLoading: userLoading,
    } = useLoadUserQuery();
    
    useEffect(() => {
        if(!userLoading && user){
          console.log("User loaded:", user);
        }
    }, [user, userLoading]);

  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState("")
  const [isLoading, setLoading] = useState(false)

  const [createOrder, { data: orderData, error }] = useCreateOrderMutation()
  
  useEffect(() => {
        if(orderData){
            console.log("Order created, user data:", user);
            
            // ✅ Only emit notification if we have valid user ID
            if(user?.user?._id){
                console.log("Emitting notification with userId:", user.user._id);
                setLoadUser(true);
                
                socketId.emit("notification",{
                  title: "New Order",
                  message: `You have a new Order from ${data.courseDetails.name}`,
                  userId: user.user._id,
                });
                
                redirect(`/course-access/${data.courseDetails?._id}`);
            } else {
                console.error("Cannot emit notification: user ID not available");
                toast.error("User information not available. Please refresh and try again.");
            }
        }
        
        if(error){
            console.error("Order creation error:", error);
            if("data" in error){
                const errorMessage = error;
                toast.error(errorMessage.data.message);
            }
        }
  },[orderData, error, user, data.courseDetails])

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("Submit - Stripe:", !!stripe, "Elements:", !!elements, "User ID:", user?.user?._id);

    if (!stripe || !elements) {
      return
    }
    
    if (!user?.user?._id) {
      toast.error("User information not loaded. Please try again.");
      return;
    }

    setLoading(true)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      })

      if (error) {
        console.error("Payment error:", error);
        setMessage(error.message)
        toast.error(error.message)
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment succeeded, creating order...");
        await createOrder({
          courseId: data.courseDetails._id,
          payment_info: paymentIntent,
        })
      }
    } catch (err) {
      console.error("Payment submission error:", err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false)
    }
  }

  if (userLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="spinner w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2">Loading user information...</span>
      </div>
    )
  }

  if (!user?.user?._id) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">Unable to load user information</p>
        <button 
          onClick={() => refetch()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <LinkAuthenticationElement 
          id="link-authentication-element"
          options={{
            defaultValues: {
              email: user?.user?.email || '',
            }
          }}
        />
      </div>
      
      <div>
        <PaymentElement 
          id="payment-element"
          options={{
            layout: "tabs"
          }}
        />
      </div>
      
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className={`w-full py-3 px-4 rounded-lg font-medium ${
          isLoading || !stripe || !elements
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
        }`}
      >
        <span id="button-text">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      
      {message && (
        <div id="payment-message" className={`text-sm p-3 rounded ${
          message.includes("successful") ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
        }`}>
          {message}
        </div>
      )}
    </form>
  )
}

export default CheckOutForm