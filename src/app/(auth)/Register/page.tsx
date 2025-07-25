"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GrNext } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const router = useRouter();

    const requestOtp = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/RequestOTP`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });
        const data = await res.json();
        if (!res.ok) alert(data.message);
    }
    const register = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Register`, {
            method: "POST",
            body: JSON.stringify({ email, password, retypePassword, otp }),
        });
        const data = await res.json();
        if (!res.ok) {
            alert(data.message);
            // setIsLoggedIn(true);
        }
        else router.push("/");
    }
    return (
        <div className="max-w-sm h-full m-full content-center">
            <div className="py-16 px-8 shadow-2xl rounded-lg">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border-1 border-black text-red-400 p-2 w-full mb-2 rounded hover:scale-101  hover:bg-red-300 hover:text-white duration-300"
                />
                <input
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border-1 border-black text-red-400 p-2 w-full mb-2 rounded hover:scale-101 hover:bg-red-300 hover:text-white duration-300"
                />
                <input
                    value={retypePassword}
                    type="password"
                    onChange={(e) => setRetypePassword(e.target.value)}
                    placeholder="Retype password"
                    className="border-1 border-black text-red-400 p-2 w-full mb-2 rounded hover:scale-101 hover:bg-red-300 hover:text-white duration-300"
                />
                <div className="flex mb-2 gap-1">
                    <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="text-red-400 w-4/5 p-2 rounded  hover:bg-red-300 hover:text-white duration-300  hover:scale-101 border-black border"
                    />
                    <button onClick={requestOtp} className="text-red-300 rounded w-1/5 cursor-pointer hover:bg-red-300 hover:text-white duration-300  hover:scale-101 border-black border">
                        Send
                    </button>
                </div>
                <div className="flex justify-center mt-6">
                    <button onClick={register} className="text-red-300 border-black p-3 border-1 cursor-pointer hover:border-red-300 hover:bg-red-300 hover:text-white duration-300 rounded-lg">
                        <GrNext className="text-2xl" />
                    </button>
                </div>
                <br></br>
                <Link href="../Login" className="text-red-400 hover:underline">
                    <div className="flex text-md">
                        <span className=" flex items-center justify-center">
                            <IoIosArrowBack className="text-md" />
                        </span>
                        Login
                    </div>
                </Link>

            </div>
        </div>
    );
}

