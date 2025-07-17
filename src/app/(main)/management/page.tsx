"use client";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { FaCheckCircle, FaClock, FaSearch } from "react-icons/fa";
interface Appointment {
	appointment_id: number;
	dose_number: number;
	created_at: string;
	status: 'DXL' | 'HT';
	users_appointments_user_idTousers?: {
		email?: string;
	};
	vaccines?: {
		name?: string;
	};
}

export default function AppointmentStream() {
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	useEffect(() => {
		const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Appointments/stream`);

		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log(data);
			setAppointments(data);
		};
		return () => {
			eventSource.close();
		};
	}, []);
	useEffect(() => {
		setData(appointments);
	}, [appointments]);
	const [searchTerm, setSearchTerm] = useState('');
	const [data, setData] = useState<Appointment[]>([]);


	const filtered = data.filter((a) =>
		a.users_appointments_user_idTousers?.email?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleComplete = async (appointment_id: number) => {
		console.log('Hoàn tất lịch hẹn ID:', appointment_id);

		await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Appointments/stream`, {
			method:"PUT",
			headers:{
				"Content-Type":"application/json"
			},
			body: JSON.stringify({appointment_id})
		})
	};

	return (
		<div className="w-full min-h-screen p-8 bg-gradient-to-b from-green-50 to-white">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
				<h2 className="text-3xl font-bold text-green-700 border-b-2 border-green-300 inline-block pb-1">
					Danh sách lịch hẹn
				</h2>

				<div className="relative w-full md:w-1/3">
					<FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blackx" />
					<input
						type="text"
						placeholder="Tìm theo email người đặt..."
						className="w-full pl-10 pr-4 py-2 rounded-full border text-black border-gray-300 shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-green-400 text-sm transition"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{filtered.map((a: any) => (
					<div
						key={a.appointment_id}
						className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition duration-300 flex flex-col justify-between"
					>
						<div>
							<div className="flex justify-between items-center mb-3 text-sm text-gray-500">
								<div>Mã lịch hẹn:</div>
								<div className="text-md font-semibold text-gray-700">{a.appointment_id}</div>
							</div>

							<div className="flex flex-col gap-2 text-gray-700 text-sm">
								<div><span className="font-medium text-gray-600">Mũi tiêm:</span> {a.dose_number}</div>
								<div><span className="font-medium text-gray-600">Email:</span> {a.users_appointments_user_idTousers?.email || '—'}</div>
								<div><span className="font-medium text-gray-600">Vaccine:</span> {a.vaccines?.name || '—'}</div>
								<div><span className="font-medium text-gray-600">Ngày tạo:</span> {dayjs(a.created_at).format('DD/MM/YYYY')}</div>
							</div>

							<div className="mt-4 flex items-center gap-2">
								{a.status === 'DXL' ? (
									<>
										<FaClock className="text-yellow-500" />
										<span className="text-yellow-700 font-medium">Đang xử lý</span>
									</>
								) : (
									<>
										<FaCheckCircle className="text-green-500" />
										<span className="text-green-700 font-medium">Đã hoàn thành</span>
									</>
								)}
							</div>
						</div>

						{a.status === 'DXL' && (
							<button
								onClick={() => handleComplete(a.appointment_id)}
								className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
							>
								Đánh dấu hoàn tất
							</button>
						)}
					</div>
				))}
			</div>

			{filtered.length === 0 && (
				<div className="mt-8 text-center text-gray-500 text-sm">
					Không tìm thấy lịch hẹn phù hợp với từ khóa "{searchTerm}"
				</div>
			)}
		</div>
	);
}