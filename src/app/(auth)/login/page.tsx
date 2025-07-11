"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GrNext } from "react-icons/gr";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [otp, setOtp] = useState("");
	const [step, setStep] = useState(1);
	const router = useRouter();

	const requestOtp = async () => {
		const res = await fetch("/api/request-otp", {
			method: "POST",
			body: JSON.stringify({ email }),
		});

		if (res.ok) setStep(2);
		else alert("Failed to send OTP");
	};

	const verifyOtp = async () => {
		const res = await fetch("/api/login", {
			method: "POST",
			body: JSON.stringify({ email, password, otp }),
		});

		const data = await res.json();
		if (res.ok) router.push("/");
		else alert(data.message);
	};

	return (
		<div className="max-w-sm h-full m-auto content-center">
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
					<button onClick={verifyOtp} className="text-red-300 border-black p-3 border-1 cursor-pointer hover:border-red-300 hover:bg-red-300 hover:text-white duration-300 rounded-lg">
						<GrNext className="text-2xl" />
					</button>
				</div>
				<br></br>
				<Link href="../Register" className="text-red-300 flex justify-end hover:underline">
					<div className="flex text-md">
						Register
						<span className=" flex items-center justify-center">
							<GrNext className="text-md" />
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
}