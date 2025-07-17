"use client"
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { FaSyringe } from 'react-icons/fa';

interface Vaccine {
	vaccine_id: number;
	name: string;
	age_range: string;
	price: string;
	description: string;
	stock_quantity: number;
	manufacturer?: string;
	doseNumber?: number
}

export default function Vaccines() {
	const [vaccines, setVaccines] = useState<Vaccine[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		fetchVaccines();
	}, []);
	const increaseDose = (vaccineId: number) => {
		setVaccines(prev =>
			prev.map(v =>
				v.vaccine_id === vaccineId
					? { ...v, doseNumber: (v.doseNumber || 0) + 1 }
					: v
			)
		);
	};

	const decreaseDose = (vaccineId: number) => {
		setVaccines(prev =>
			prev.map(v =>
				v.vaccine_id === vaccineId
					? { ...v, doseNumber: Math.max(0, (v.doseNumber || 0) - 1) }
					: v
			)
		);
	};

	const fetchVaccines = async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vaccines`);
			const data = await response.json();

			if (data.success) {
				setVaccines(data.data);
			} else {
				setError(data.message || 'Lỗi khi tải danh sách vắc xin');
			}
		} catch (error) {
			setError('Lỗi kết nối. Vui lòng thử lại sau.');
			console.error('Error fetching vaccines:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleBookAppointment = async (vaccine_id: number, stockQuantity: number) => {
		const vaccine = vaccines.find(v => v.vaccine_id === vaccine_id);
		const doseNumber = vaccine?.doseNumber || 0;

		if (doseNumber <= 0) {
			alert("Vui lòng chọn số liều hợp lệ (ít nhất 1).");
			return;
		}

		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/BookVaccines`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ doseNumber, vaccine_id, stockQuantity }),
		});
		if(!res.ok){
			router.push('/Login');
		}else{
			alert("đặt lịch tiêm thành công");
		}
	};


	if (loading) {
		return (
			<div className="w-full h-full">
				<div className="w-full h-full p-3 mx-auto">
					<h1 className="text-2xl font-bold text-gray-800 mb-6">Danh mục Vắc xin</h1>
					<div className="flex justify-center items-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
						<p className="ml-4 text-gray-600">Đang tải danh sách vắc xin...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6">
				<div className="max-w-6xl mx-auto">
					<h1 className="text-2xl font-bold text-gray-800 mb-6">Danh mục Vắc xin</h1>
					<div className="text-center py-12">
						<div className="text-red-600 mb-4">
							<FaSyringe className="text-4xl mx-auto mb-2 opacity-50" />
							<p className="text-lg">{error}</p>
						</div>
						<button
							onClick={fetchVaccines}
							className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
						>
							Thử lại
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-full bg-cyan-600">
			<div className="w-full h-full p-3 mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold text-black-800">Danh mục Vắc xin</h1>
					<button
						onClick={fetchVaccines}
						className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
					>
						Làm mới
					</button>
				</div>

				{vaccines.length === 0 ? (
					<div className="text-center py-12">
						<FaSyringe className="text-4xl text-gray-400 mx-auto mb-4" />
						<p className="text-gray-600">Hiện tại chưa có vắc xin nào</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{vaccines.map((vaccine) => (
							<div key={vaccine.vaccine_id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
								<div className="flex items-center mb-4">
									<FaSyringe className="text-2xl text-cyan-600 mr-3" />
									<h3 className="text-lg font-semibold text-black">{vaccine.name}</h3>
								</div>

								<div className="space-y-2 mb-4">
									<p className="text-sm text-gray-600">
										<span className="font-medium">Độ tuổi:</span> {vaccine.age_range}
									</p>
									<p className="text-sm text-gray-600">
										<span className="font-medium">Giá:</span>
										<span className="text-cyan-600 font-semibold ml-1 text-xl">{vaccine.price} VNĐ</span>
									</p>
									<p className="text-sm text-gray-600">{vaccine.description}</p>

									{vaccine.stock_quantity !== undefined && (
										<p className="text-sm text-gray-600">
											<span className="font-medium">Còn lại:</span>
											<span className={`ml-1 ${vaccine.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
												{vaccine.stock_quantity > 0 ? `${vaccine.stock_quantity} liều` : 'Hết hàng'}
											</span>
										</p>
									)}

									{vaccine.manufacturer && (
										<p className="text-sm text-gray-600">
											<span className="font-medium">Nhà sản xuất:</span> {vaccine.manufacturer}
										</p>
									)}
								</div><div className="flex justify-center items-center space-x-2 my-2">
									<button
										onClick={() => decreaseDose(vaccine.vaccine_id)}
										className="px-2 py-1 bg-black rounded hover:bg-black"
									>
										−
									</button>
									<span className="text-md text-black font-semibold">{vaccine.doseNumber || 0}</span>
									<button
										onClick={() => increaseDose(vaccine.vaccine_id)}
										className="px-2 py-1 bg-black rounded hover:bg-black"
									>
										+
									</button>
								</div>
								<button
									onClick={() => handleBookAppointment(vaccine.vaccine_id, vaccine.stock_quantity)}
									disabled={vaccine.stock_quantity === 0}
									className={`w-full py-2 rounded-lg transition-colors ${vaccine.stock_quantity === 0
										? 'bg-gray-300 text-gray-500 cursor-not-allowed'
										: 'bg-cyan-600 text-white hover:bg-cyan-700'
										}`}
								>
									{vaccine.stock_quantity === 0 ? 'Hết hàng' : 'Đặt lịch tiêm'}
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}