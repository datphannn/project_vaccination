"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GrNext } from "react-icons/gr";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [step, setStep] = useState(1);
	const router = useRouter();


	const verifyOtp = async () => {
		const res = await fetch("/api/Login", {
			method: "POST",
			body: JSON.stringify({ email, password}),
		});

		const data = await res.json();
		if (res.ok){
			router.push("/");
			router.refresh();
		}
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