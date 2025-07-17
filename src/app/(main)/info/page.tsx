"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FaSyringe, FaCalendarAlt } from "react-icons/fa";
import { MdVaccines } from "react-icons/md";

interface Appointment {
    appointment_id: number;
    dose_number: number;
    created_at: string;
    status: 'DXL' | 'HT';
    vaccines: {
        name: string;
    };
}


export default function Info() {
    const [data, setData] = useState<Appointment[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Info`, {
                    method: "GET",
                    credentials: "include",
                });

                const result = await res.json();
                console.log(result);
                setData(result.appointments);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const handleCancel = async (id: number) => {
        if (!confirm("Bạn có chắc muốn hủy lịch hẹn này không?")) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Appointments/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setData((prev) => prev?.filter((a) => a.appointment_id !== id) ?? []);
                alert("Hủy lịch hẹn thành công");
            } else {
                alert("Hủy lịch thất bại");
            }
        } catch (error) {
            console.error("Lỗi khi hủy:", error);
            alert("Đã xảy ra lỗi khi hủy lịch");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10 px-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-green-700 mb-8 text-center border-b pb-2">
                    🩺 Lịch sử tiêm chủng của bạn
                </h2>

                {loading ? (
                    <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
                ) : data && data.length > 0 ? (
                    <div className="space-y-5">
                        {data.map((a) => (
                            <div
                                key={a.appointment_id}
                                className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FaSyringe className="text-green-500" />
                                    <span className="text-gray-700 font-medium">Mũi tiêm #{a.dose_number}</span>
                                </div>

                                <div className="flex items-center gap-3 mb-2">
                                    <MdVaccines className="text-blue-500" />
                                    <span className="text-gray-700">Vaccine: <strong>{a.vaccines?.name || "Không rõ"}</strong></span>
                                </div>

                                <div className="flex items-center gap-3 mb-4">
                                    <FaCalendarAlt className="text-gray-500" />
                                    <span className="text-gray-700">
                                        Ngày tiêm: <strong>{dayjs(a.created_at).format("DD/MM/YYYY")}</strong>
                                    </span>
                                </div>

                                {a.status === 'DXL' && (
                                    <button
                                        onClick={() => handleCancel(a.appointment_id)}
                                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                    >
                                        Hủy lịch
                                    </button>
                                )}
                            </div>

                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Không có lịch sử tiêm chủng nào được ghi nhận.</p>
                )}
            </div>
        </div>
    );
}
