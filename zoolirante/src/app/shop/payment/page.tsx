
import Link from 'next/link';
import Image from "next/image";

export default function payment() {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light text-gray-500 mb-6">
          Payment
        </h1>

        <div className="w-full aspect-video rounded-2xl shadow-lg overflow-hidden  bg-white">




 <div className="md:col-span-5 space-y-4 p-4 bg-white border border-gray-300 rounded-lg w-1/2 h-full" style={{float: 'left', position: 'relative'}}>
            <form>
            
            <h2 className="text-xl font-bold text-orange-500 mb-4">Your Details</h2>
        
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date <span className="text-red-500">*</span> </label>
                <input
                type="date"
                min={new Date().toISOString().split("T")[0]} // Cannot select a past date
               // value={selectedDate}
                required
                //onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
                />
            </div>

            <div className="flex space-x-2">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span> </label>
                    <input
                    type="text"
                    placeholder="First Name"
                   // value={firstName}
                    required
                    //onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div className="flex-2 mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span> </label>
                    <input
                    type="text"
                    placeholder="Last Name"
                    required
                    //value={lastName}
                    //onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span> </label>
                <input
                type="email"
                placeholder="janedoe@example.com"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
            />
        </div>

        <div className="flex space-x-2">
            
            {/* Card Number */}
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number <span className="text-red-500">*</span></label>
                <input
                type="text"
                placeholder="1234 5678 9876 5432"
                maxLength={19}
                required
                inputMode="numeric"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* CVC */}
            <div className="w-20 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC <span className="text-red-500">*</span></label>
                <input
                type="text"
                placeholder="123"
                maxLength={3}
                inputMode="numeric"
                required
                className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* Expiry */}
            <div className="w-24">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry <span className="text-red-500">*</span></label>
                <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                required
                className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-1">

                <h2 className="font-bold">Order Summary</h2>

            
                <div className="flex justify-between">
                    <span>GST</span>
                    <span>$</span>
                </div>

                <div className="flex justify-between font-bold">
                    <span>Total Cost</span>
                    <span>$ AUD</span>
                </div>
            </div>

        <Link href="/shop">
        <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors w-full">
            Confirm
        </button>
        </Link>
        </form>
      </div>
<div className='w-1/2 h-full' style={{float: 'right', position: 'relative', display:'flex',flexDirection:'column', justifyContent:'space-between', alignItems:'center'}} >
                       <Image
                      src={"/cart.png"}
                      alt="shop icon"
                      width={150}
                      height={150}
                      style={{ objectFit: 'cover', marginTop:'10%'}}
                      />
            <h2 className="text-xl font-bold text-orange-500 mb-4" style={{  marginTop:'5%', textAlign:'center'}} >Name</h2>
            <h2 className="text-xl font-bold text-orange-500 mb-4" style={{  marginBottom:'60%', textAlign:'center'}} >Price</h2>




</div>














        </div>
      </div>
    </div>
  );
}
